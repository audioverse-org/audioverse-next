import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const presenters = (r: string) => ({
	letter: (letter: string) => node(`${r}/letter/${letter}`),
	all: node(`${r}/all`),
	id: (personId: Scalars['ID']['output']) =>
		node(`${r}/${personId}`, (r) => ({
			teachings: paginatedNode(`${r}/teachings`),
			feed: node(`${r}/feed.xml`),
			top: node(`${r}/top`),
			sequences: paginatedNode(`${r}/sequences`),
			appears: paginatedNode(`${r}/appears`),
		})),
});

export default presenters;
