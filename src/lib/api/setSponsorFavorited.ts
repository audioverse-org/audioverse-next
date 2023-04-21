import { sponsorFavorite } from './__generated__/sponsorFavorite';
import { sponsorUnfavorite } from './__generated__/sponsorUnfavorite';

export async function setSponsorFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? sponsorFavorite : sponsorUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
