import { collectionFavorite } from '@lib/api/collectionFavorite.gql';
import { collectionUnfavorite } from '@lib/api/collectionUnfavorite.gql';

export async function setCollectionFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? collectionFavorite : collectionUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
