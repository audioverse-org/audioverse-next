import { useQueryClient } from '@tanstack/react-query';

import { setCollectionFavorited } from '~lib/api/setCollectionFavorited';
import { getSessionToken } from '~lib/cookies';
import { Scalars } from '~src/__generated__/graphql';

import {
	CollectionIsFavoritedQuery,
	useCollectionIsFavoritedQuery,
} from './__generated__/collectionIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

interface IUseIsCollectionFavoritedResult extends IUseIsFavoritedResult {
	playbackCompletedPercentage: number;
}

export function useIsCollectionFavorited(
	id: Scalars['ID']['output'],
): IUseIsCollectionFavoritedResult {
	const queryClient = useQueryClient();
	const { data } = useCollectionIsFavoritedQuery(
		{ id },
		{
			enabled: !!getSessionToken(),
		},
	);
	const generatedQueryKey = ['collectionIsFavorited', { id }];

	const result = useIsFavorited(
		['isCollectionFavorited', id],
		async () => {
			const result =
				queryClient.getQueryData<CollectionIsFavoritedQuery>(generatedQueryKey);
			return !!result?.collection?.viewerHasFavorited;
		},
		(isFavorited) => setCollectionFavorited(id, isFavorited),
		[generatedQueryKey],
	);
	const playbackCompletedPercentage =
		data?.collection?.viewerPlaybackCompletedPercentage || 0;
	return {
		...result,
		playbackCompletedPercentage,
	};
}
