import { Scalars } from '../generated/graphql';
import node from './primatives/node';

const books = (r: string) => ({
	id: (bookId: Scalars['ID']) =>
		node(`${r}/${bookId}`, (r) => ({
			feed: node(`${r}/feed.xml`),
		})),
});

export default books;