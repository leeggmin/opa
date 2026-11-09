import assert from 'node:assert/strict';
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