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

import fs from 'fs';

console.log('hello world');

type Langs = Record<string, { string: string; comment?: string }>;
const enLangs: Langs = JSON.parse(
	fs.readFileSync('./public/lang/en.json').toString()
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
	console.log(`Missing ids in ${lang}: ${missingIds.length}`);
});
