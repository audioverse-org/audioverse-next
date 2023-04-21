import { Scalars } from '@src/__generated__/graphql';
import node from './primatives/node';

const releases = (r: string) => ({
	id: (releaseId: Scalars['ID']) => node(`${r}/${releaseId}`),
});

export default releases;
