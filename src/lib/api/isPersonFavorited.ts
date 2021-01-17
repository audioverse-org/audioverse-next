import { fetchApi } from '@lib/api/fetchApi';

const query = `
query isFavorited($id: ID!) {
	person(id: $id) {
		viewerHasFavorited
	}
}
`;

export async function isPersonFavorited(id: number | string): Promise<boolean> {
	const variables = { id },
		data = await fetchApi(query, { variables });

	return !!data?.person?.viewerHasFavorited;
}
