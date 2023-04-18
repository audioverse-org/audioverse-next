import { Scalars } from '../generated/graphql';
import node from './primatives/node';
import slug from './primatives/slug';

const songs = (r: string) => ({
	albums: node(`${r}/albums`, (r) => ({
		id: (albumId: Scalars['ID']) => ({
			feed: node(`${r}/${albumId}/feed.xml`),
		}),
	})),
	book: (bookName: string) =>
		node(`${r}/book/${slug(bookName)}`, (r) => ({
			track: (canonicalPath: string) =>
				node(`${r}/${canonicalPath.split('/').slice(3).join('/')}`),
		})),
});

export default songs;
