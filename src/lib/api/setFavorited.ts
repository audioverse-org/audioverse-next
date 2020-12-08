import { fetchApi } from '@lib/api/fetchApi';

const favoriteQuery = `
query favorite($id: ID!) {
	favoriteRecording(id: $id)
}
`;

const unfavoriteQuery = `
query unfavorite($id: ID!) {
	unfavoriteRecording(id: $id)
}
`;

// TODO: Replace `any` in return type with something more specific
export async function setFavorited(
	id: number | string,
	favorite: boolean
): Promise<any> {
	const variables = { id },
		query = favorite ? favoriteQuery : unfavoriteQuery;

	return await fetchApi(query, { variables });
}
