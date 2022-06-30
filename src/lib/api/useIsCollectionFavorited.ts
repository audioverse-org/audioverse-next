import { useQueryClient } from 'react-query';

import { setCollectionFavorited } from '@lib/api/setCollectionFavorited';
import { getSessionToken } from '@lib/cookies';
import { Scalars } from '@src/__generated__/graphql';

import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';
import {
	CollectionIsFavoritedQuery,
	useCollectionIsFavoritedQuery,
} from '@lib/api/__generated__/collectionIsFavorited';

interface IUseIsCollectionFavoritedResult extends IUseIsFavoritedResult {
	playbackCompletedPercentage: number;
}

export function useIsCollectionFavorited(
	id: Scalars['ID']
): IUseIsCollectionFavoritedResult {
	const queryClient = useQueryClient();
	const { data } = useCollectionIsFavoritedQuery(
		{ id },
		{
			enabled: !!getSessionToken(),
		}
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
		[generatedQueryKey]
	);
	const playbackCompletedPercentage =
		data?.collection?.viewerPlaybackCompletedPercentage || 0;
	return {
		...result,
		playbackCompletedPercentage,
	};
}
