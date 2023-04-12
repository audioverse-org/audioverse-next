import { Scalars } from '../generated/graphql';
import node from './primatives/node';

const library = (r: string) => ({
	playlist: (playlistId: Scalars['ID']) => node(`${r}/playlist/${playlistId}`),
	subpath: (subpath: string) => node(`${r}${subpath}`),
});

export default library;
