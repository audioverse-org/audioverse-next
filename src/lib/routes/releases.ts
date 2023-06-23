import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';

const releases = (r: string) => ({
	id: (releaseId: Scalars['ID']['output']) => node(`${r}/${releaseId}`),
});

export default releases;
