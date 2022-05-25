#!/usr/bin/env node

const lodash = require('lodash');
const fs = require('fs');

const languages = ['es', 'fr', 'de', 'ja', 'ru', 'zh'];

const appLangs = require('../audioverse-mobile/locales/en.json');
const appKeys = Object.keys(appLangs);
const englishWebsiteLangs = require('./public/lang/en.json');
const englishWebsiteValues = lodash.values(
	lodash.pick(
		lodash.invert(
			lodash.mapValues(englishWebsiteLangs, ({ string }) => string)
		),
		appKeys
	)
);

for (const language of languages) {
	const langPath = `../audioverse-mobile/locales/${language}.json`;
	const existingLangs = require(langPath);
	const websiteLangs = require(`./public/lang/${language}.json`);

	const matchesByKey = lodash.mapValues(
		lodash.pick(websiteLangs, appKeys),
		({ string }) => string
	);

	const matchesByEnglishValue = lodash.keys(
		lodash.pick(websiteLangs, englishWebsiteValues)
	);
	const mappedLanguageMatches = lodash.zipObject(
		matchesByEnglishValue.map((key) => englishWebsiteLangs[key].string),
		matchesByEnglishValue.map((key) => websiteLangs[key].string)
	);

	fs.writeFileSync(
		langPath,
		JSON.stringify({
			...existingLangs,
			...matchesByKey,
			...mappedLanguageMatches,
		})
	);
}
