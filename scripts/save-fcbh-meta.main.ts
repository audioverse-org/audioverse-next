import fs from 'fs';

import { fetchFcbhBibles } from '~src/services/bibles/fetchFcbhBibles';
import transformBible from '~src/services/bibles/transformBible';

export default async function main() {
	const bibles = await fetchFcbhBibles();

	if (!bibles?.length) {
		throw new Error('No Bibles found');
	}

	const transformedBibles = [];

	for (const bible of bibles) {
		transformedBibles.push(await transformBible('en', bible));
	}

	fs.writeFileSync('fcbh-bibles.json', JSON.stringify(transformedBibles));
}
