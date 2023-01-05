import { personFavorite, personUnfavorite } from '@/lib/generated/graphql';

export async function setPersonFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? personFavorite : personUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
