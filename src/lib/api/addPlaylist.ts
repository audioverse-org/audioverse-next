import { fetchApi } from '@lib/api/fetchApi';

const mutation = `
mutation($language: Language!, $title: String!, $isPublic: Boolean!) {
	playlistAdd(
		input: {
			language: $language,
			title: $title,
			isPublic: $isPublic
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
	isPublic: boolean
): Promise<string | false> {
	const variables = { language: languageId, title, isPublic };
	const result = await fetchApi(mutation, { variables });

	return result?.playlistAdd?.id || false;
}
