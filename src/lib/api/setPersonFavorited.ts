import { personFavorite } from './__generated__/personFavorite';
import { personUnfavorite } from './__generated__/personUnfavorite';

export async function setPersonFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? personFavorite : personUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
