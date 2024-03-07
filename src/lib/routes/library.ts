import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';

const library = (r: string) => ({
	playlist: (playlistId: Scalars['ID']['output']) =>
		node(`${r}/playlists/${playlistId}`),
	playlists: node(`${r}/playlists`),
	history: node(`${r}/history`),
});

export default library;
