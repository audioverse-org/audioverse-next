import { execSync } from 'child_process';
import fs from 'fs';

const BODY_PREFIX = '<!-- intl summary -->';

type Langs = Record<string, { string: string; comment?: string }>;

function getLangs(filePath: string, hash: string): Langs {
	const c = execSync(`git show ${hash}:${filePath}`, { encoding: 'utf-8' });
	return JSON.parse(c);
}

function getSummary(filePaths: string[], hash1: string, hash2: string): string {
	let s = `${BODY_PREFIX}\nfile|id|change|string\n---|---|---|---`;

	filePaths.forEach((p) => {
		const langs1 = getLangs(p, hash1);
		const langs2 = getLangs(p, hash2);
		const ids1 = Object.keys(langs1);
		const ids2 = Object.keys(langs2);
		const added = ids2.filter((id) => !ids1.includes(id));
		const removed = ids1.filter((id) => !ids2.includes(id));

		if (added.length == 0 && removed.length == 0) {
			return;
		}

		added.forEach((id) => (s += `\n${p}|${id}|added|${langs2[id].string}`));
		removed.forEach((id) => (s += `\n${p}|${id}|removed|${langs1[id].string}`));
	});

	return s;
}

export async function main({ github, context }): Promise<void> {
	console.log('running');
	const { data } = await github.rest.repos.listPullRequestsAssociatedWithCommit(
		{
			owner: context.repo.owner,
			repo: context.repo.repo,
			commit_sha: context.sha,
		}
	);

	const prNumber = data[0] && data[0].number;

	if (!prNumber) {
		console.warn('No PR found for this commit');
		return;
	}

	const langFiles = fs.readdirSync('./public/lang/');
	const hash1 = github.event.pull_request.base.sha;
	const hash2 = github.sha;
	const body = getSummary(langFiles, hash1, hash2);

	const { data: comments } = await github.rest.issues.listComments({
		owner: context.repo.owner,
		repo: context.repo.repo,
		issue_number: prNumber,
	});

	const prev = comments.find((c: { body: string }) =>
		c.body.startsWith(BODY_PREFIX)
	);

	if (prev) {
		// Update the previous comment
		await github.rest.issues.updateComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			comment_id: prev.id,
			body,
		});
	} else {
		// Create a new comment
		await github.rest.issues.createComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			issue_number: prNumber,
			body,
		});
	}
}
