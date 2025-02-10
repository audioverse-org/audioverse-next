import fs from 'fs';

import { fetchFcbhBibles } from '~src/services/bibles/api/fetchFcbhBibles';

export default async function main() {
	const bibles = await fetchFcbhBibles();

	if (!bibles?.length) {
		throw new Error('No Bibles found');
	}

	fs.writeFileSync('fcbh-bibles.json', JSON.stringify(bibles));
}
