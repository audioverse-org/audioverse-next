import fs from 'fs';
import { dirname } from 'path';

import { fetchFcbhBibles } from '~src/services/bibles/fcbh/fetchFcbhBibles';

const outpath = 'src/services/bibles/fcbh/__generated__/metadata.ts';

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

	fs.mkdirSync(dirname(outpath), { recursive: true });

	fs.writeFileSync(
		outpath,
		`export const data = \`
${JSON.stringify(biblesWithoutUrls, null, 2)}
\`;`,
	);
}
