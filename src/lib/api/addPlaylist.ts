import { fetchApi } from '@lib/api/fetchApi';

const mutation = `
mutation($language: Language!, $title: String!, $isPublic: Boolean!) {
	playlistAdd(
		language: $language,
		title: $title,
		isPublic: $isPublic
	)
}
`;

export async function addPlaylist(
	languageId: string,
	title: string,
	isPublic: boolean
): Promise<boolean> {
	const variables = { language: languageId, title, isPublic };
	const result = await fetchApi(mutation, { variables });

	return result.ok;
}
