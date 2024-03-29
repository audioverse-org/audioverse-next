import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const stories = (r: string) => ({
	albums: paginatedNode(`${r}/albums`, (r) => ({
		id: (albumId: Scalars['ID']['output']) => ({
			feed: node(`${r}/${albumId}/feed.xml`),
		}),
	})),
});

export default stories;
