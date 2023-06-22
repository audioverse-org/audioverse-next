#!/usr/bin/env node

const fs = require('fs');
const reduce = require('lodash/reduce');

const enLangs = JSON.parse(fs.readFileSync('./public/lang/en.json'));

const langs = fs.readdirSync('./public/lang/');

langs
	.filter((file) => file !== 'en.json')
	.map((file) => {
		console.log(`Extracting new keys from ${file}`);

		const raw = fs.readFileSync(`./public/lang/${file}`, 'utf8').trim();
		const langLangs = JSON.parse(raw);

		const newLangs = reduce(
			enLangs,
			(carry, value, key) => {
				if (!langLangs[key]) {
					carry[key] = value;
				}
				return carry;
			},
			{}
		);

		fs.writeFileSync(`./${file}`, JSON.stringify(newLangs));
	});
