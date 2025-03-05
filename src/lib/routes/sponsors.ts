import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const sponsors = (r: string) => ({
	id: (sponsorId: Scalars['ID']['output']) =>
		node(`${r}/${sponsorId}`, (r) => ({
			teachings: paginatedNode(`${r}/teachings`, (r) => ({
				feed: node(`${r}/feed.xml`),
			})),
			conferences: paginatedNode(`${r}/conferences`),
			series: paginatedNode(`${r}/series`),
		})),
	letter: (letter: string) => node(`${r}/letter/${letter}`),
	all: node(`${r}/all`),
});

export default sponsors;
