import { Scalars } from '../generated/graphql';
import node from './primatives/node';

const series = (r: string) => ({
	id: (seriesId: Scalars['ID']) => ({
		feed: node(`${r}/${seriesId}/feed.xml`),
	}),
});

export default series;
