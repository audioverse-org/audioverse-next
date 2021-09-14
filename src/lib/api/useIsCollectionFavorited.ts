import { setCollectionFavorited } from '@lib/api/setCollectionFavorited';
import { Scalars } from '@lib/generated/graphql';

import { collectionIsFavorited } from './collectionIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

export function useIsCollectionFavorited(
	id: Scalars['ID']
): IUseIsFavoritedResult {
	return useIsFavorited(
		['isCollectionFavorited', id],
		() => collectionIsFavorited(id),
		(isFavorited) => setCollectionFavorited(id, isFavorited)
	);
}
