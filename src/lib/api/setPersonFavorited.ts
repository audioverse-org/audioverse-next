import { fetchApi } from '@lib/api/fetchApi';

const favoriteQuery = `
query favorite($id: ID!) {
	personFavorite(id: $id)
}
`;

const unfavoriteQuery = `
query unfavorite($id: ID!) {
	personUnfavorite(id: $id)
}
`;

// TODO: Replace `any` in return type with something more specific
export function setPersonFavorited(
	id: number | string,
	favorite: boolean
): Promise<any> {
	const variables = { id },
		query = favorite ? favoriteQuery : unfavoriteQuery;

	return fetchApi(query, { variables });
}
