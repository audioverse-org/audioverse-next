import { collectionFavorite } from './collectionFavorite.generated';
import { collectionUnfavorite } from './collectionUnfavorite.generated';

export async function setCollectionFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? collectionFavorite : collectionUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
