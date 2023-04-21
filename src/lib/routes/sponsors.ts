import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const sponsors = (r: string) => ({
	id: (sponsorId: Scalars['ID']) =>
		node(`${r}/${sponsorId}`, (r) => ({
			feed: node(`${r}/feed.xml`),
			teachings: paginatedNode(`${r}/teachings`),
			conferences: paginatedNode(`${r}/conferences`),
			series: paginatedNode(`${r}/series`),
		})),
	letter: (letter: string) => node(`${r}/letter/${letter}`),
	all: node(`${r}/all`),
});

export default sponsors;
