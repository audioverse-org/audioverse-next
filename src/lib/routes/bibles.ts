import { Scalars } from '~src/__generated__/graphql';
import { BIBLE_BOOK_METAS } from '~src/services/bibles/constants';

import node from './primatives/node';

const fcbhIds = BIBLE_BOOK_METAS.map((m) => m.fcbhId.toLocaleLowerCase());

const fcbhId = (r: string) => (fcbhId: string) => {
	if (!fcbhIds.includes(fcbhId.toLowerCase())) {
		throw new Error(`Invalid fcbhId: ${fcbhId}`);
	}

	return node(`${r}/${encodeURIComponent(fcbhId.toLowerCase())}`, (r) => ({
		chapterNumber: (chapterNumber: Scalars['ID']['output']) =>
			node(`${r}/${chapterNumber}`),
	}));
};

const bibles = (r: string) => ({
	versionId: (versionId: Scalars['ID']['output']) =>
		node(`${r}/${versionId}`, (r) => ({ fcbhId: fcbhId(`${r}`) })),
});

export default bibles;
