import { Scalars } from '../generated/graphql';
import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const stories = (r: string) => ({
	albums: paginatedNode(`${r}/albums`, (r) => ({
		id: (albumId: Scalars['ID']) => ({
			feed: node(`${r}/${albumId}/feed.xml`),
		}),
	})),
});

export default stories;
