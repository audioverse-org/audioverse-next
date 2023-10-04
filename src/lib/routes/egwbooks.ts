import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';

const egwbooks = (r: string) => ({
	id: (bookId: Scalars['ID']['output']) =>
		node(`${r}/${bookId}`, (r) => ({
			feed: node(`${r}/feed.xml`),
		})),
});

export default egwbooks;
