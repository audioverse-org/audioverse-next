import fs from 'fs';

import { fetchFcbhBibles } from '~src/services/bibles/fcbh/fetchFcbhBibles';

export default async function main() {
	const bibles = await fetchFcbhBibles();

	if (!bibles?.length) {
		throw new Error('No Bibles found');
	}

	const biblesWithoutUrls = bibles.map((b) => ({
		...b,
		books: b.books.map((b) => ({
			...b,
			chapters_full: b.chapters_full.map((c) => ({ ...c, url: undefined })),
		})),
	}));

	fs.writeFileSync(
		'fcbh-bibles.ts',
		`export const data = \`
${JSON.stringify(biblesWithoutUrls, null, 2)}
\`;`,
	);
}
