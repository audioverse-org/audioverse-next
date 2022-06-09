import { sponsorFavorite } from '@lib/api/sponsorFavorite.gql';
import { sponsorUnfavorite } from '@lib/api/sponsorUnfavorite.gql';

export async function setSponsorFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? sponsorFavorite : sponsorUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
