import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { collectGitHubContext } from './access.mjs';

const repository = 'leeggmin/opa';
const pull = {
    number: 7, user: { login: 'original-author' }, changed_files: 1,
    head: { sha: 'pr-head' }, base: { ref: 'main', repo: { full_name: repository } },
    merged_at: '2026-11-09T00:00:00Z', merge_commit_sha: 'merged-sha',
};
const file = { filename: 'frontend/src/features/button.js', previous_filename: 'frontend/src/shared/button.js' };
const options = {
    repository, sha: 'merged-sha', event: { number: 7, pull_request: { head: { sha: 'pr-head' } } },
    request: async path => path.includes('/commits/') ? [pull] : path.includes('/files?') ? [file] : pull,
};

test('PR identity comes from GitHub author and retains rename origin', async () => {
    const context = await collectGitHubContext({ ...options, stage: 'pr' });
    assert.equal(context.actor, 'original-author');
    assert.equal(context.changes[0].previous_filename, file.previous_filename);
    assert.equal(context.revision, 'pr-head');
});

test('deployment rechecks original PR author, not merging user', async () => {
    const context = await collectGitHubContext({ ...options, stage: 'deploy' });
    assert.equal(context.actor, 'original-author');
    assert.equal(context.revision, 'merged-sha');
});

test('direct push with no merged PR is blocked', async () => {
    await assert.rejects(collectGitHubContext({ ...options, stage: 'deploy', request: async () => [] }), /merged PR/);
});

test('stale PR event is blocked', async () => {
    await assert.rejects(collectGitHubContext({ ...options, stage: 'pr', event: { number: 7, pull_request: { head: { sha: 'stale' } } } }), /changed/);
});

test('incomplete file list is blocked', async () => {
    await assert.rejects(collectGitHubContext({
        ...options, stage: 'pr', request: async path => path.includes('/files?') ? [] : pull,
    }), /Incomplete/);
});

test('large PR requiring truncated GitHub file metadata is blocked', async () => {
    await assert.rejects(collectGitHubContext({
        ...options, stage: 'pr', request: async () => ({ ...pull, changed_files: 3001 }),
    }), /1-3000/);
});

for (const stage of ['pr', 'deploy']) {
    test(`collect ${stage} writes GitHub input without invoking OPA`, async () => {
        const directory = mkdtempSync(join(tmpdir(), 'opa-collect-'));
        try {
            mkdirSync(join(directory, 'scripts'));
            const script = join(directory, 'scripts', 'access.mjs');
            copyFileSync(new URL('./access.mjs', import.meta.url), script);
            const eventFile = join(directory, 'event.json');
            writeFileSync(eventFile, JSON.stringify(options.event));
            const mock = `globalThis.fetch = async url => Response.json(url.includes('/commits/') ? [${JSON.stringify(pull)}] : url.includes('/files?') ? [${JSON.stringify(file)}] : ${JSON.stringify(pull)});`;
            const environment = Object.fromEntries(Object.entries(process.env).filter(([key]) => key.toLowerCase() !== 'path'));
            const result = spawnSync(process.execPath, [
                '--import', `data:text/javascript,${encodeURIComponent(mock)}`, script, 'collect', stage,
            ], {
                env: {
                    ...environment, PATH: '', GITHUB_TOKEN: 'test-token', GITHUB_EVENT_PATH: eventFile,
                    GITHUB_REPOSITORY: repository, GITHUB_SHA: options.sha,
                },
                encoding: 'utf8',
            });
            assert.equal(result.status, 0, result.stderr);
            const context = JSON.parse(readFileSync(join(directory, '.opa', 'access-context.json'), 'utf8'));
            assert.deepEqual(context, await collectGitHubContext({ ...options, stage }));
        } finally {
            rmSync(directory, { recursive: true, force: true });
        }
    });
}