import { execSync } from 'child_process';
import fs from 'fs';

const BODY_PREFIX = '<!-- intl summary -->';
const BOM_REGEX = /^\uFEFF/;

type Langs = Record<string, { string: string; comment?: string }>;

function getLangs(filePath: string, hash: string): Langs {
	try {
		const c = execSync(`git show ${hash}:${filePath}`, {
			encoding: 'utf-8',
		}).replace(BOM_REGEX, '');
		return JSON.parse(c);
	} catch (e) {
		return {};
	}
}

function getLangFiles(paths: string[], hash: string): Record<string, Langs> {
	return paths.reduce<Record<string, Langs>>((acc, p) => {
		const f = p.split('/').pop() as string;
		return { ...acc, [f]: getLangs(p, hash) };
	}, {});
}

function getAllStringIds(
	files1: Record<string, Langs>,
	files2: Record<string, Langs>,
): Set<string> {
	const ids = new Set<string>();

	Object.values(files1).forEach((langs) =>
		Object.keys(langs).forEach((id) => ids.add(id)),
	);
	Object.values(files2).forEach((langs) =>
		Object.keys(langs).forEach((id) => ids.add(id)),
	);

	return ids;
}

function getAllLangIds(
	files1: Record<string, Langs>,
	files2: Record<string, Langs>,
): Set<string> {
	const ids = new Set<string>();

	Object.keys(files1).forEach((s) => ids.add(s.split('.')[0]));
	Object.keys(files2).forEach((s) => ids.add(s.split('.')[0]));

	return ids;
}

function getFlag(
	stringId: string,
	langId: string,
	files1: Record<string, Langs>,
	files2: Record<string, Langs>,
) {
	const lang1 = files1[`${langId}.json`]?.[stringId];
	const lang2 = files2[`${langId}.json`]?.[stringId];
	const en2 = files2['en.json']?.[stringId];
	const isAdded = !lang1 && lang2;
	const isDeleted = lang1 && !lang2;
	const mutation = isAdded ? '+' : isDeleted ? '-' : '';
	const untranslated =
		langId !== 'en' && lang2 && lang2.string === en2?.string ? '!' : '';
	const survives = Object.values(files2).some((f) => f[stringId]);
	const missing = survives && !lang2 ? '?' : '';

	return `${mutation}${langId}${untranslated}${missing}`;
}

function getLight(flags: string) {
	return flags.includes('?')
		? '🔴 '
		: flags.includes('!')
			? '🟡 '
			: flags.includes('+')
				? '🟢 '
				: flags.includes('-')
					? '🔵 '
					: '';
}

function getSummary(paths: string[], hash1: string, hash2: string): string {
	const lines = [
		'## Internationalization Summary',
		'',
		'syntax | flag | description',
		'------ | ---- | ----------',
		'fr     | -    | unchanged string',
		'+fr    | 🟢   | added string',
		'-fr    | 🔵   | removed string',
		'fr!    | 🟡   | untranslated string',
		'fr?    | 🔴   | missing string',
	];
	const files1 = getLangFiles(paths, hash1);
	const files2 = getLangFiles(paths, hash2);
	const sringIds = getAllStringIds(files1, files2);
	const langIds = getAllLangIds(files1, files2);

	sringIds.forEach((stringId) => {
		const defaultString =
			files2['en.json']?.[stringId]?.string ??
			files1['en.json']?.[stringId]?.string ??
			'';

		const flags = Array.from(langIds)
			.map((langId) => getFlag(stringId, langId, files1, files2))
			.join(' ');

		const light = getLight(flags);

		if (flags.match(/(\+|-|!|\?)/g)) {
			lines.push(`
**${light}${stringId}**

${flags}

> ${defaultString}

---
`);
		}
	});

	return lines.join('\n');
}

function getSummaryUrl(prNumber: number, { context }: Options) {
	const owner = context.repo.owner;
	const repo = context.repo.repo;
	const runId = context.runId;

	return `https://github.com/${owner}/${repo}/actions/runs/${runId}?pr=${prNumber}`;
}

function getBody(
	paths: string[],
	hash1: string,
	hash2: string,
	summaryUrl: string,
) {
	const files1 = getLangFiles(paths, hash1);
	const files2 = getLangFiles(paths, hash2);
	const sringIds = getAllStringIds(files1, files2);
	const langIds = getAllLangIds(files1, files2);

	const lines: string[] = [
		'## Localization Summary',
		'',
		'language | unchanged | added | removed | untranslated',
		'-------- | --------- | ----- | ------- | ------------',
	];

	langIds.forEach((langId) => {
		const unchangedCount = Array.from(sringIds).filter((stringId) => {
			const lang1 = files1[`${langId}.json`]?.[stringId];
			const lang2 = files2[`${langId}.json`]?.[stringId];
			return lang1?.string === lang2?.string;
		}).length;

		const addedCount = Array.from(sringIds).filter((stringId) => {
			const lang1 = files1[`${langId}.json`]?.[stringId];
			const lang2 = files2[`${langId}.json`]?.[stringId];
			return !lang1 && lang2;
		}).length;

		const removedCount = Array.from(sringIds).filter((stringId) => {
			const lang1 = files1[`${langId}.json`]?.[stringId];
			const lang2 = files2[`${langId}.json`]?.[stringId];
			return lang1 && !lang2;
		}).length;

		const untranslatedCount = Array.from(sringIds).filter((stringId) => {
			const lang2 = files2[`${langId}.json`]?.[stringId];
			const en2 = files2['en.json']?.[stringId];
			return langId !== 'en' && lang2 && lang2.string === en2?.string;
		}).length;

		lines.push(
			`${langId} | ${unchangedCount} | ${addedCount} | ${removedCount} | ${untranslatedCount}`,
		);
	});

	lines.push('');
	lines.push(`[View full summary](${summaryUrl})`);

	return lines.join('\n');
}

type Options = {
	github: {
		rest: {
			issues: {
				createComment: (options: {
					owner: string;
					repo: string;
					issue_number: number;
					body: string;
				}) => Promise<void>;
				listComments: (options: {
					owner: string;
					repo: string;
					issue_number: number;
				}) => Promise<{ data: any[] }>;
				updateComment: (options: {
					owner: string;
					repo: string;
					comment_id: number;
					body: string;
				}) => Promise<void>;
			};
		};
	};
	context: {
		payload: {
			pull_request?: {
				number: number;
				base: {
					sha: string;
				};
			};
		};
		repo: {
			owner: string;
			repo: string;
		};
		sha: string;
		runId: unknown;
	};
	core: {
		summary: {
			addRaw: (text: string) => void;
			addHeading: (text: string) => void;
			addSeparator: () => void;
			addQuote: (text: string) => void;
			write: (options: { overwrite: boolean }) => void;
		};
	};
};

async function upsertComment(
	prNumber: number,
	body: string,
	{ github, context }: Options,
) {
	body = `${BODY_PREFIX}\n\n${body}`;

	const { data: comments } = await github.rest.issues.listComments({
		owner: context.repo.owner,
		repo: context.repo.repo,
		issue_number: prNumber,
	});

	const prev = comments.find((c: { body: string }) =>
		c.body.startsWith(BODY_PREFIX),
	);

	if (prev) {
		await github.rest.issues.updateComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			comment_id: prev.id,
			body,
		});
	} else {
		await github.rest.issues.createComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			issue_number: prNumber,
			body,
		});
	}
}

export default async function main(ctx: Options): Promise<void> {
	const { context, core } = ctx;
	const pr = context.payload.pull_request;

	if (!pr) {
		console.warn('No PR found for this commit');
		return;
	}

	const langFiles = fs
		.readdirSync('./public/lang/')
		.map((f) => `public/lang/${f}`);
	const hash1 = pr.base.sha;
	const hash2 = context.sha;
	const summary = getSummary(langFiles, hash1, hash2);
	const summaryUrl = getSummaryUrl(pr.number, ctx);
	const comment = getBody(langFiles, hash1, hash2, summaryUrl);

	core.summary.addRaw(summary);
	core.summary.write({ overwrite: true });

	await upsertComment(pr.number, comment, ctx);
}
