import node from './primatives/node';

const playlists = (r: string) => ({
	playlist: (playlistId: string | number) =>
		node(`${r}/${playlistId}`, (r) => ({
			items: (canonicalPath: string) =>
				node(`${r}/items/${canonicalPath.split('/').slice(3).join('/')}`),
		})),
});

export default playlists;
