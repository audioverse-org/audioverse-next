import { Scalars } from '@src/__generated__/graphql';
import node from './primatives/node';

const library = (r: string) => ({
	playlist: (playlistId: Scalars['ID']) => node(`${r}/playlist/${playlistId}`),
	playlists: node(`${r}/playlists`),
	history: node(`${r}/history`),
});

export default library;
