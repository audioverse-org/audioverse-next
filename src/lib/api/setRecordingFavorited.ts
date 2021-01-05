import { fetchApi } from '@lib/api/fetchApi';

const favoriteQuery = `
mutation favorite($id: ID!) {
	favoriteRecording(id: $id)
}
`;

const unfavoriteQuery = `
mutation unfavorite($id: ID!) {
	unfavoriteRecording(id: $id)
}
`;

// TODO: Replace `any` in return type with something more specific
export function setRecordingFavorited(
	id: number | string,
	favorite: boolean
): Promise<any> {
	const variables = { id },
		query = favorite ? favoriteQuery : unfavoriteQuery;

	return fetchApi(query, { variables });
}
