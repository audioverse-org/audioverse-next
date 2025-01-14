import fs from 'fs';

import { getBibles } from '~src/services/fcbh/getBibles';
import transformBible from '~src/services/fcbh/transformBible';

export default async function main() {
	const bibles = await getBibles();

	if (!bibles?.length) {
		throw new Error('No Bibles found');
	}

	const transformedBibles = [];

	for (const bible of bibles) {
		transformedBibles.push(await transformBible('en', bible));
	}

	fs.writeFileSync('fcbh-bibles.json', JSON.stringify(transformedBibles));
}
