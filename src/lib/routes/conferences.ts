import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const conferences = (r: string) => ({
	id: (conferenceId: Scalars['ID']['output']) =>
		node(`${r}/${conferenceId}`, (r) => ({
			feed: node(`${r}/feed.xml`),
			sequences: paginatedNode(`${r}/sequences`),
			presenters: paginatedNode(`${r}/presenters`, (r) => ({
				id: (id: Scalars['ID']['output']) => node(`${r}/${id}`),
			})),
			teachings: paginatedNode(`${r}/teachings`),
		})),
});

export default conferences;
