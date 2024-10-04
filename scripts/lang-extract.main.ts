import { extractAndWrite } from '@formatjs/cli-lib';
import { execSync } from 'child_process';
import fs from 'fs';
import glob from 'glob';

type Langs = Record<string, { string: string; comment?: string }>;

function showMergeBase(relativeFilePath: string) {
	const command = `PAGER=cat git show $(git merge-base --fork-point origin/master):${relativeFilePath}`;
	const result = execSync(command, { encoding: 'utf-8' }).toString().trim();

	return result;
}

export default async function main() {
	const extractionOptions = {
		idInterpolationPattern: '[sha512:contenthash:base64:6]',
		throws: true,
		extractSourceLocation: true,
		outFile: 'public/lang/en.json',
		format: 'lang-formatter.js',
	};

	const files = glob.sync('src/**/*.ts*', { ignore: ['src/**/*.d.ts*'] });

	await extractAndWrite(files, extractionOptions);

	const baseEnLangs: Langs = JSON.parse(showMergeBase('public/lang/en.json'));
	const enLangs: Langs = JSON.parse(
		fs.readFileSync(`./public/lang/en.json`).toString(),
	);
	const langFiles = fs.readdirSync('./public/lang/');
	const baseEnIds = Object.keys(baseEnLangs);
	const enIds = Object.keys(enLangs);

	const writeQueue = new Map<string, string>();

	langFiles.forEach((langFile) => {
		if (langFile === 'en.json') return;
		const jsonString = fs.readFileSync(`./public/lang/${langFile}`).toString();
		const langs: Langs = JSON.parse(jsonString);
		const ids = Object.keys(langs);
		const missingIds = enIds.filter((id) => !ids.includes(id));
		const outDatedIds = ids.filter((id) => !enIds.includes(id));
		const renamedIds = ids.filter((id) => {
			const stringMatch = baseEnIds.find(
				(enId) => baseEnLangs[enId].string === langs[id].string,
			);
			return stringMatch && stringMatch !== id;
		});

		if (missingIds.length) {
			missingIds.forEach((id) => {
				langs[id] = enLangs[id];
			});
		}

		if (renamedIds.length) {
			const baseLangs: Langs = JSON.parse(
				showMergeBase(`public/lang/${langFile}`),
			);
			renamedIds.forEach((id) => {
				const enId = baseEnIds.find(
					(enId) => baseEnLangs[enId].string === langs[id].string,
				);
				if (!enId || !(enId in baseLangs)) return;
				langs[id].string = baseLangs[enId].string;
			});
		}

		if (outDatedIds.length) {
			outDatedIds.forEach((id) => {
				delete langs[id];
			});
		}

		writeQueue.set(langFile, JSON.stringify(langs, null, 2));
	});

	writeQueue.forEach((content, langFile) => {
		fs.writeFileSync(`./public/lang/${langFile}`, content);
	});
}
