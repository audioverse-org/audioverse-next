import { collectionFavorite } from './__generated__/collectionFavorite';
import { collectionUnfavorite } from './__generated__/collectionUnfavorite';

export async function setCollectionFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? collectionFavorite : collectionUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
