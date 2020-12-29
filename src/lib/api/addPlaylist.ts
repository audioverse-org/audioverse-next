import { fetchApi } from '@lib/api/fetchApi';

const mutation = `
mutation($language: Language!, $title: String!, $isPublic: Boolean!, $recordingIds: [ID!]) {
	playlistAdd(
		input: {
			language: $language,
			title: $title,
			isPublic: $isPublic,
			recordingIds: $recordingIds,
		}
	) {
	  id
	}
}
`;

// TODO: Make return type more specific
export async function addPlaylist(
	languageId: string,
	title: string,
	options: {
		isPublic?: boolean;
		recordingIds?: string[];
	}
): Promise<string | false> {
	const { isPublic = false, recordingIds = [] } = options;
	const variables = { language: languageId, title, isPublic, recordingIds };
	const result = await fetchApi(mutation, { variables });

	return result?.playlistAdd?.id || false;
}
