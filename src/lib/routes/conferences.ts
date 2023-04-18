import { Scalars } from '../generated/graphql';
import node from './primatives/node';
import paginatedNode from './primatives/paginatedNode';

const conferences = (r: string) => ({
	id: (conferenceId: Scalars['ID']) =>
		node(`${r}/${conferenceId}`, (r) => ({
			feed: node(`${r}/feed.xml`),
			sequences: paginatedNode(`${r}/sequences`),
			presenters: paginatedNode(`${r}/presenters`),
			teachings: paginatedNode(`${r}/teachings`),
		})),
});

export default conferences;
