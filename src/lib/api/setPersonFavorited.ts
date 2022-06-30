import { personUnfavorite } from '@lib/api/__generated__/personUnfavorite';
import { personFavorite } from '@lib/api/__generated__/personFavorite';

export async function setPersonFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? personFavorite : personUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
