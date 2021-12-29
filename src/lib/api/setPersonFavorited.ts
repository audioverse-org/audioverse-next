import { personFavorite } from './personFavorite.generated';
import { personUnfavorite } from './personUnfavorite.generated';

export async function setPersonFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? personFavorite : personUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
