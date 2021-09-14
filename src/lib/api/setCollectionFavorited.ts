import {
	collectionFavorite,
	collectionUnfavorite,
} from '@lib/generated/graphql';

export async function setCollectionFavorited(
	id: number | string,
	favorite: boolean
): Promise<boolean> {
	const query = favorite ? collectionFavorite : collectionUnfavorite;
	return query({ id }).then(({ favorited: { success } }) => success);
}
