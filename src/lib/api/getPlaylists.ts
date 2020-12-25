import { fetchApi } from '@lib/api/fetchApi';
import { Playlist } from 'types';

const query = `
query getPlaylists($language: Language!, $recordingId: ID!) {
	me {
		user {
			playlists(language: $language) {
				nodes {
					id
					title
					hasRecording(id: $recordingId)
				}
			}
		}
	}
}
`;

export async function getPlaylists(
	languageId: string,
	{ recordingId = -1 }: { recordingId?: string | number } = {}
): Promise<Playlist[]> {
	const variables = { language: languageId, recordingId };
	const result = await fetchApi(query, { variables });

	console.log({ m: 'getting playlists', languageId, recordingId, result });

	return result?.me?.user?.playlists?.nodes;
}
