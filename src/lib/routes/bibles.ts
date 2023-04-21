import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';

const bibles = (r: string) => ({
	versionId: (versionId: Scalars['ID']) => node(`${r}/${versionId}`),
	bookId: (bookId: Scalars['ID']) =>
		node(`${r}/${bookId}`, (r) => ({
			chapterNumber: (chapterNumber: Scalars['ID']) =>
				node(`${r}/${chapterNumber}`),
		})),
});

export default bibles;
