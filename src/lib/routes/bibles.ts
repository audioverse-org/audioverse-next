import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';

const bookId = (r: string) => (bookId: Scalars['ID']['output']) =>
	node(`${r}/${bookId}`, (r) => ({
		chapterNumber: (chapterNumber: Scalars['ID']['output']) =>
			node(`${r}/${chapterNumber}`),
	}));

const bibles = (r: string) => ({
	versionId: (versionId: Scalars['ID']['output']) =>
		node(`${r}/${versionId}`, (r) => ({ bookId: bookId(`${r}`) })),
	bookId: bookId(`${r}`),
});

export default bibles;
