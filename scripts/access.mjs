import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const opaImage = 'openpolicyagent/opa:1.10.1@sha256:4715d0574ca2f8c5ecd65b4e5b0833a53aea0f79c31e52a93972b104bbd614fd';

export function authorize(context, stage) {
    const result = spawnSync('docker', [
        'run', '--rm', '--interactive',
        '--mount', `type=bind,source=${resolve(root, 'policy')},target=/policy,readonly`,
        opaImage, 'eval', '--stdin-input', '--format=json',
        '--data', '/policy/access.rego', '--data', '/policy/members.json', 'data.access',
    ], { input: JSON.stringify({ ...context, stage }), encoding: 'utf8' });
    if (result.error || result.status !== 0) {
        throw new Error(`Access policy evaluation failed: ${result.error?.message || result.stderr}`);
    }
    const decision = JSON.parse(result.stdout).result?.[0]?.expressions?.[0]?.value;
    if (typeof decision?.allow !== 'boolean' || !Array.isArray(decision.deny)) {
        throw new Error('Undefined access decision; refusing to continue.');
    }
    console.log(JSON.stringify({ stage, actor: context.actor, allow: decision.allow, deny: decision.deny }, null, 2));
    if (!decision.allow || decision.deny.length > 0) {
        throw new Error(`Package access denied at the ${stage} gate.`);
    }
    return context;
}

export function authorizeFile(file, stage) {
    if (!file) {
        throw new Error('An access context is required. Use a local example or OPA_ACCESS_CONTEXT from the CI collector.');
    }
    const context = JSON.parse(readFileSync(resolve(root, file), 'utf8'));
    if (process.env.GITHUB_ACTIONS === 'true' && (
        context.source !== 'github-api' || context.revision !== process.env.GITHUB_SHA || stage !== 'deploy'
    )) {
        throw new Error('CI deployment requires GitHub-derived context for the exact deployed revision.');
    }
    return authorize(context, stage);
}

export async function collectGitHubContext({ stage, event, repository, sha, request }) {
    if (!/^[\w.-]+\/[\w.-]+$/.test(repository || '')) {
        throw new Error('Invalid GitHub repository.');
    }
    const prefix = `/repos/${repository}`;
    let number;
    if (stage === 'pr') {
        number = event.pull_request?.number ?? event.number;
    } else if (stage === 'deploy') {
        const associated = await request(`${prefix}/commits/${sha}/pulls?per_page=100`);
        const merged = associated.filter(pull => pull.merged_at && pull.merge_commit_sha === sha
            && pull.base?.repo?.full_name === repository && pull.base.ref === 'main');
        if (merged.length !== 1) {
            throw new Error('Deployment requires exactly one merged PR for this commit; direct pushes are blocked.');
        }
        number = merged[0].number;
    } else {
        throw new Error('Stage must be pr or deploy.');
    }
    if (!Number.isSafeInteger(number) || number <= 0) {
        throw new Error('A valid PR number is required.');
    }
    const pull = await request(`${prefix}/pulls/${number}`);
    if (pull.base?.repo?.full_name !== repository || pull.base.ref !== 'main') {
        throw new Error('The PR must target this repository main branch.');
    }
    if (stage === 'pr' && pull.head.sha !== event.pull_request?.head?.sha) {
        throw new Error('The PR changed during inspection; rerun the latest check.');
    }
    if (stage === 'deploy' && (!pull.merged_at || pull.merge_commit_sha !== sha)) {
        throw new Error('Merged PR provenance does not match the deployed commit.');
    }
    if (!Number.isSafeInteger(pull.changed_files) || pull.changed_files < 1 || pull.changed_files > 3000) {
        throw new Error('Cannot safely inspect the entire PR file list (supported range: 1-3000).');
    }
    const changes = [];
    for (let page = 1; page <= Math.ceil(pull.changed_files / 100); page += 1) {
        const files = await request(`${prefix}/pulls/${number}/files?per_page=100&page=${page}`);
        for (const file of files) {
            changes.push({ filename: file.filename, ...(file.previous_filename ? { previous_filename: file.previous_filename } : {}) });
        }
    }
    if (changes.length !== pull.changed_files || new Set(changes.map(change => change.filename)).size !== changes.length) {
        throw new Error('Incomplete or duplicate changed-file metadata; refusing to authorize.');
    }
    return {
        source: 'github-api', actor: pull.user.login, stage, changes,
        revision: stage === 'pr' ? pull.head.sha : sha, pr_number: number,
    };
}

async function main() {
    const [command, argument, ...extra] = process.argv.slice(2);
    if (extra.length > 0) {
        throw new Error('Too many arguments.');
    }
    if (command === 'check') {
        const file = argument || 'examples/access/member-shared.json';
        const context = JSON.parse(readFileSync(resolve(root, file), 'utf8'));
        authorize(context, 'pr');
        authorize(context, 'deploy');
        return;
    }
    if (!['github', 'collect'].includes(command) || !['pr', 'deploy'].includes(argument)) {
        throw new Error('Usage: node scripts/access.mjs check [example.json] | github <pr|deploy> | collect <pr|deploy>');
    }
    if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_EVENT_PATH) {
        throw new Error('GitHub API token and event file are required for real identity collection.');
    }
    const request = async path => {
        const response = await fetch(`https://api.github.com${path}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
            },
            signal: AbortSignal.timeout(30000),
        });
        if (!response.ok) {
            throw new Error(`GitHub metadata request failed (${response.status}).`);
        }
        return response.json();
    };
    const context = await collectGitHubContext({
        stage: argument,
        event: JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')),
        repository: process.env.GITHUB_REPOSITORY,
        sha: process.env.GITHUB_SHA,
        request,
    });
    if (command === 'github') {
        authorize(context, argument);
    }
    if (command === 'collect' || argument === 'deploy') {
        const output = resolve(root, '.opa/access-context.json');
        mkdirSync(dirname(output), { recursive: true });
        writeFileSync(output, `${JSON.stringify(context, null, 2)}\n`);
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
    main().catch(error => {
        console.error(`FAILED: ${error.message}`);
        process.exitCode = 1;
    });
}