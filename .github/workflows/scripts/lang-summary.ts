import { execSync } from 'child_process';
import fs from 'fs';

const BODY_PREFIX = '<!-- intl summary -->';
const BOM_REGEX = /^\uFEFF/;

/* 
# Current

lang                | id               | change | string
------------------- | ---------------- | ------ | --------------------
public/lang/en.json | about__navSpirit | add    | Spirit of AudioVerse

# Target

syntax | flag | description
------ | ---- | ----------
es     | -    |   unchanged string
+es    | 🟢   |  added string
-es    | 🔵   |   removed string
es!    | 🟡   |  untranslated string
es?    | 🔴   |  missing string

id				    | default 			   | langs
------------------- | -------------------- | ---------------------------------
🔴 about__navSpirit | Spirit of AudioVerse | +en -br -es -fr -pt ru zh?
🟡 about__navStory  | Our Story			   | +en +br! +es! +fr! +pt! ru! zh!
*/

type Langs = Record<string, { string: string; comment?: string }>;

function getLangs(filePath: string, hash: string): Langs {
	try {
		const c = execSync(`git show ${hash}:${filePath}`, {
			encoding: 'utf-8',
		}).replace(BOM_REGEX, '');
		return JSON.parse(c);
	} catch (e) {
		console.warn(`Error reading file ${filePath}`);
		console.warn(e);
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
	files2: Record<string, Langs>
): Set<string> {
	const allIds = new Set<string>();

	Object.values(files1).forEach((langs) =>
		Object.keys(langs).forEach((id) => allIds.add(id))
	);
	Object.values(files2).forEach((langs) =>
		Object.keys(langs).forEach((id) => allIds.add(id))
	);

	return allIds;
}

function getAllLangIds(
	files1: Record<string, Langs>,
	files2: Record<string, Langs>
): Set<string> {
	const allLangs = new Set<string>();

	Object.keys(files1).forEach((fileName) =>
		allLangs.add(fileName.split('.')[0])
	);
	Object.keys(files2).forEach((fileName) =>
		allLangs.add(fileName.split('.')[0])
	);

	return allLangs;
}

function getSummary(paths: string[], hash1: string, hash2: string): string {
	const lines = [
		BODY_PREFIX,
		'syntax | flag | description',
		'------ | ---- | ----------',
		'fr     | -    | unchanged string',
		'+fr    | 🟢   | added string',
		'-fr    | 🔵   | removed string',
		'fr!    | 🟡   | untranslated string',
		'fr?    | 🔴   | missing string',
		'',
		'id|default|langs',
		'-|-|-',
	];
	const files1 = getLangFiles(paths, hash1);
	const files2 = getLangFiles(paths, hash2);
	const sringIds = getAllStringIds(files1, files2);
	const langIds = getAllLangIds(files1, files2);

	sringIds.forEach((stringId) => {
		let row = `${stringId}|`;

		const defaultString =
			files2['en.json']?.[stringId]?.string ??
			files1['en.json']?.[stringId]?.string ??
			'';

		row += defaultString + '|';

		langIds.forEach((langId) => {
			const lang1 = files1[`${langId}.json`]?.[stringId];
			const lang2 = files2[`${langId}.json`]?.[stringId];
			const en2 = files2['en.json']?.[stringId];
			const isAdded = !lang1 && lang2;
			const isDeleted = lang1 && !lang2;
			const mutation = isAdded ? '+' : isDeleted ? '-' : '';
			const untranslated =
				langId !== 'en' && lang2 && lang2.string === en2?.string ? '!' : '';
			const missing = !lang2 ? '?' : '';

			row += `${mutation}${langId}${untranslated}${missing} `;
		});

		row.match(/(\+|-|!|\?)/g) && lines.push(row);
	});

	return lines.join('\n');
}

type Options = {
	github: any;
	context: any;
};

export default async function main({
	github,
	context,
}: Options): Promise<void> {
	console.log('running');

	const prNumber = context.payload.pull_request.number;

	if (!prNumber) {
		console.warn('No PR found for this commit');
		return;
	}

	console.log('PR found:', prNumber);

	const langFiles = fs
		.readdirSync('./public/lang/')
		.map((f) => `public/lang/${f}`);
	const hash1 = context.payload.pull_request.base.sha;
	const hash2 = context.sha;
	const body = getSummary(langFiles, hash1, hash2);

	const { data: comments } = await github.rest.issues.listComments({
		owner: context.repo.owner,
		repo: context.repo.repo,
		issue_number: prNumber,
	});

	const prev = comments.find((c: { body: string }) =>
		c.body.startsWith(BODY_PREFIX)
	);

	console.log(body);

	if (prev) {
		console.log('Updating previous comment');
		await github.rest.issues.updateComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			comment_id: prev.id,
			body,
		});
	} else {
		console.log('Creating new comment');
		await github.rest.issues.createComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			issue_number: prNumber,
			body,
		});
	}
}
