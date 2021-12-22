#!/usr/bin/env node

const fs = require('fs');
const reduce = require('lodash/reduce');

const enLangs = JSON.parse(fs.readFileSync('./public/lang/en.json'));

const langs = fs.readdirSync('./public/lang/');

langs
	.filter((file) => file !== 'en.json')
	.map((file) => {
		const langLangs = JSON.parse(fs.readFileSync(`./public/lang/${file}`));

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
