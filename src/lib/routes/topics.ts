import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';
import slug from './primatives/slug';

const topics = (r: string) => ({
	id: (topicId: Scalars['ID']['output']) =>
		node(`${r}/${topicId}`, (r) => ({
			slug: (topicTitle: string) => node(`${r}/${slug(topicTitle)}`),
		})),
});

export default topics;
