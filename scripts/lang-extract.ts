// #!/bin/sh

// echo "hello world"

// echo $(pwd)

// npm exec -- formatjs extract 'src/**/*.ts*' \
//     --ignore 'src/**/*.d.ts*' \
//     --throws \
//     --extract-source-location \
//     --id-interpolation-pattern '[sha512:contenthash:base64:6]' \
//     --out-file public/lang/en.json \
//     --format lang-formatter.js

import { extractAndWrite } from '@formatjs/cli-lib';
import fs from 'fs';
import glob from 'glob';

type Langs = Record<string, { string: string; comment?: string }>;

async function main() {
	const extractionOptions = {
		idInterpolationPattern: '[sha512:contenthash:base64:6]',
		throws: true,
		extractSourceLocation: true,
		outFile: 'public/lang/en.json',
		format: 'lang-formatter.js',
	};

	const files = glob.sync('src/**/*.ts*', { ignore: ['src/**/*.d.ts*'] });

	await extractAndWrite(files, extractionOptions);

	const enLangs: Langs = JSON.parse(
		fs.readFileSync(`./public/lang/en.json`).toString()
	);
	const langFiles = fs.readdirSync('./public/lang/');
	const enIds = Object.keys(enLangs);

	console.log(enIds);

	langFiles.forEach((langFile) => {
		if (langFile === 'en.json') return;
		console.log(langFile);
		const lang = langFile.split('.')[0];
		const jsonString = fs.readFileSync(`./public/lang/${langFile}`).toString();
		const langs: Langs = JSON.parse(jsonString);
		const ids = Object.keys(langs);
		const missingIds = enIds.filter((id) => !ids.includes(id));
		const outDatedIds = ids.filter((id) => !enIds.includes(id));

		console.log(`Missing ids in ${lang}: ${missingIds.length}`);
		console.log(`Outdated ids in ${lang}: ${outDatedIds.length}`);

		if (missingIds.length) {
			missingIds.forEach((id) => {
				langs[id] = enLangs[id];
			});
		}

		if (outDatedIds.length) {
			outDatedIds.forEach((id) => {
				delete langs[id];
			});
		}

		fs.writeFileSync(
			`./public/lang/${langFile}`,
			JSON.stringify(langs, null, 2)
		);
	});
}

main().catch(console.error);
