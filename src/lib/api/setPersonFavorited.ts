import { personFavorite } from '@lib/api/personFavorite.gql';
import { personUnfavorite } from '@lib/api/personUnfavorite.gql';

export async function setPersonFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? personFavorite : personUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
