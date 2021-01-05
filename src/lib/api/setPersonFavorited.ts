import { fetchApi } from '@lib/api/fetchApi';

const favoriteQuery = `
mutation favorite($id: ID!) {
	personFavorite(id: $id) {
		success
	}
}
`;

const unfavoriteQuery = `
mutation unfavorite($id: ID!) {
	personUnfavorite(id: $id) {
		success
	}
}
`;

export async function setPersonFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const variables = { id };
	const query = favorite ? favoriteQuery : unfavoriteQuery;
	const data = await fetchApi(query, { variables });

	return !!data?.personFavorite?.success;
}
