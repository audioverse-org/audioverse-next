import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';

const bookName = (r: string) => (bookName: string) =>
	node(`${r}/${encodeURIComponent(bookName.toLowerCase())}`, (r) => ({
		chapterNumber: (chapterNumber: Scalars['ID']['output']) =>
			node(`${r}/${chapterNumber}`),
	}));

const bibles = (r: string) => ({
	versionId: (versionId: Scalars['ID']['output']) =>
		node(`${r}/${versionId}`, (r) => ({ bookName: bookName(`${r}`) })),
});

export default bibles;
