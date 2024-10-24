import { useQueryClient } from '@tanstack/react-query';

import { setSequenceFavorited } from '~lib/api/setSequenceFavorited';
import { getSessionToken } from '~lib/cookies';
import { Scalars } from '~src/__generated__/graphql';

import {
	SequenceIsFavoritedQuery,
	useSequenceIsFavoritedQuery,
} from './__generated__/sequenceIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';
import { RECORDING_FAVORITED_QUERY_KEY_PREFIX } from './useIsRecordingFavorited';

interface IUseIsSequenceFavoritedResult extends IUseIsFavoritedResult {
	playbackCompletedPercentage: number;
}

export function useIsSequenceFavorited(
	id: Scalars['ID']['output'],
): IUseIsSequenceFavoritedResult {
	const queryClient = useQueryClient();
	const { data } = useSequenceIsFavoritedQuery(
		{ id },
		{
			enabled: !!getSessionToken(),
		},
	);
	const generatedQueryKey = ['sequenceIsFavorited', { id }];

	const result = useIsFavorited(
		['isSequenceFavorited', id],
		async () => {
			const result =
				queryClient.getQueryData<SequenceIsFavoritedQuery>(generatedQueryKey);
			return !!result?.sequence?.viewerHasFavorited;
		},
		(isFavorited) => setSequenceFavorited(id, isFavorited),
		[
			[RECORDING_FAVORITED_QUERY_KEY_PREFIX, { sequenceId: id }],
			generatedQueryKey,
		],
	);
	const playbackCompletedPercentage =
		data?.sequence?.viewerPlaybackCompletedPercentage || 0;
	return {
		...result,
		playbackCompletedPercentage,
	};
}
