import { Scalars } from '~src/__generated__/graphql';

import node from './primatives/node';

const library = (r: string) => ({
	playlist: (playlistId: Scalars['ID']['output']) =>
		node(`${r}/playlists/${playlistId}`),
	playlists: (playlistId?: string | number) =>
		node(`${r}/playlists${playlistId ? `/${playlistId}` : ''}`, (r) => ({
			items: (canonicalPath: string) =>
				node(`${r}/items/${canonicalPath.split('/').slice(3).join('/')}`),
		})),
	history: node(`${r}/history`),
});

export default library;
