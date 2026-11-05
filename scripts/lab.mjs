import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { setTimeout } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const opaImage = 'openpolicyagent/opa:1.10.1@sha256:4715d0574ca2f8c5ecd65b4e5b0833a53aea0f79c31e52a93972b104bbd614fd';
const containerName = 'opa-lab';
const labLabel = 'com.opa.lab';
const labLabelValue = 'local-cicd';
const policyMount = `type=bind,source=${resolve(root, 'policy')},target=/policy,readonly`;

function docker(args, { input, quiet = false } = {}) {
    const result = spawnSync('docker', args, {
        cwd: root,
        input,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
    });
    if (result.error) {
        throw new Error(`Cannot run Docker: ${result.error.message}`);
    }
    if (!quiet) {
        process.stdout.write(result.stdout || '');
        process.stderr.write(result.stderr || '');
    }
    if (result.status !== 0) {
        throw new Error(`Docker command failed (${result.status}): ${result.stderr || result.stdout}`);
    }
    return result.stdout;
}

function requireDocker() {
    const platform = docker(['info', '--format', '{{.OSType}}'], { quiet: true }).trim();
    if (platform !== 'linux') {
        throw new Error('Start Docker Desktop with the Linux container engine.');
    }
}

function testPolicy() {
    console.log('\n[CI] Testing Rego policies');
    docker(['run', '--rm', '--mount', policyMount, opaImage, 'test', '/policy', '-v']);
}

function readDeployment(file) {
    return JSON.parse(readFileSync(resolve(root, file), 'utf8'));
}

function evaluate(deployment) {
    const output = docker([
        'run', '--rm', '--interactive', '--mount', policyMount, opaImage,
        'eval', '--stdin-input', '--data', '/policy/deploy.rego',
        '--format=json', 'data.deploy',
    ], { input: JSON.stringify(deployment), quiet: true });
    const evaluation = JSON.parse(output);
    const decision = evaluation.result?.[0]?.expressions?.[0]?.value;
    if (typeof decision?.allow !== 'boolean' || !Array.isArray(decision.deny)) {
        throw new Error('OPA returned an invalid or undefined decision. Deployment is blocked.');
    }
    console.log(JSON.stringify({ allow: decision.allow, deny: decision.deny }, null, 2));
    return decision;
}

function requireApproval(deployment) {
    console.log('\n[CI] Checking deployment policy');
    const decision = evaluate(deployment);
    if (decision.allow !== true || decision.deny.length !== 0) {
        throw new Error('OPA denied this deployment. No image was built or container replaced.');
    }
    return deployment;
}

function testDeniedExamples() {
    for (const file of ['deploy/denied-latest.json', 'deploy/denied-privileged.json']) {
        console.log(`\n[CI] Expecting denial: ${file}`);
        const decision = evaluate(readDeployment(file));
        if (decision.allow !== false || decision.deny.length === 0) {
            throw new Error(`Unsafe example was not explicitly denied: ${file}`);
        }
    }
    console.log('Both unsafe examples were correctly blocked.');
}

function ownedContainerExists() {
    const identifier = docker([
        'ps', '--all', '--filter', `name=^/${containerName}$`, '--format', '{{.ID}}',
    ], { quiet: true }).trim();
    if (!identifier) {
        return false;
    }
    const labels = JSON.parse(docker([
        'inspect', '--format', '{{json .Config.Labels}}', identifier,
    ], { quiet: true }));
    if (labels?.[labLabel] !== labLabelValue) {
        throw new Error(`An unrelated container named ${containerName} exists; it will not be removed.`);
    }
    return true;
}

async function verifyDeployment(deployment) {
    const url = `http://127.0.0.1:${deployment.host_port}`;
    for (let attempt = 0; attempt < 30; attempt += 1) {
        try {
            const response = await fetch(`${url}/health`, { signal: AbortSignal.timeout(1000) });
            const health = await response.json();
            if (response.ok && health.status === 'ok') {
                const details = await fetch(url, { signal: AbortSignal.timeout(1000) });
                const body = await details.json();
                if (!details.ok || body.service !== containerName || body.version !== deployment.image.split(':')[1]) {
                    throw new Error('The deployed application returned unexpected metadata.');
                }
                console.log(`\n[CD] Healthy deployment: ${url}`);
                console.log(JSON.stringify(body, null, 2));
                return;
            }
        } catch (error) {
            if (attempt === 29) {
                throw new Error(`Deployment health check failed: ${error.message}`);
            }
        }
        await setTimeout(250);
    }
    throw new Error(`Deployment did not become healthy: ${url}`);
}

async function deploy(file) {
    testPolicy();
    const deployment = requireApproval(readDeployment(file));
    const existing = ownedContainerExists();
    console.log(`\n[CD] Building ${deployment.image}`);
    docker(['build', '--tag', deployment.image, '.']);
    if (existing) {
        docker(['rm', '--force', containerName]);
    }
    const runArgs = [
        'run', '--detach', '--name', containerName,
        '--label', `${labLabel}=${labLabelValue}`,
        '--publish', `127.0.0.1:${deployment.host_port}:${deployment.container_port}`,
        '--user', `${deployment.run_as_user}:${deployment.run_as_user}`,
        '--memory', '128m', '--cpus', '0.5', '--pids-limit', '64',
        '--env', `APP_VERSION=${deployment.image.split(':')[1]}`,
    ];
    if (deployment.read_only) {
        runArgs.push('--read-only');
    }
    for (const capability of deployment.cap_drop) {
        runArgs.push('--cap-drop', capability);
    }
    if (deployment.no_new_privileges) {
        runArgs.push('--security-opt', 'no-new-privileges:true');
    }
    console.log('\n[CD] Starting the approved container');
    docker([...runArgs, deployment.image]);
    await verifyDeployment(deployment);
}

try {
    const [command = 'test', file = 'deploy/development.json', ...extra] = process.argv.slice(2);
    const commands = ['test', 'check', 'negative-tests', 'deploy', 'verify', 'status', 'down'];
    if (!commands.includes(command) || extra.length > 0) {
        throw new Error(`Usage: node scripts/lab.mjs <${commands.join('|')}> [deployment.json]`);
    }
    requireDocker();
    switch (command) {
        case 'test':
            testPolicy();
            break;
        case 'check':
            requireApproval(readDeployment(file));
            break;
        case 'negative-tests':
            testDeniedExamples();
            break;
        case 'deploy':
            await deploy(file);
            break;
        case 'verify':
            await verifyDeployment(requireApproval(readDeployment(file)));
            break;
        case 'status':
            docker(['ps', '--all', '--filter', `label=${labLabel}=${labLabelValue}`, '--format', 'table {{.Names}}\t{{.Status}}\t{{.Ports}}']);
            break;
        case 'down':
            if (ownedContainerExists()) {
                docker(['rm', '--force', containerName]);
            } else {
                console.log('No lab container to remove.');
            }
            break;
    }
} catch (error) {
    console.error(`\nFAILED: ${error.message}`);
    process.exitCode = 1;
}