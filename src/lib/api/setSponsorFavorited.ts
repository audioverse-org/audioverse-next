import { sponsorFavorite, sponsorUnfavorite } from '@/lib/generated/graphql';

export async function setSponsorFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? sponsorFavorite : sponsorUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
