import { useQueryClient } from 'react-query';

import { setSequenceFavorited } from '@lib/api/setSequenceFavorited';
import { getSessionToken } from '@lib/cookies';
import { Scalars } from '@src/__generated__/graphql';

import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';
import { RECORDING_FAVORITED_QUERY_KEY_PREFIX } from './useIsRecordingFavorited';
import {
	SequenceIsFavoritedQuery,
	useSequenceIsFavoritedQuery,
} from '@lib/api/__generated__/sequenceIsFavorited';

interface IUseIsSequenceFavoritedResult extends IUseIsFavoritedResult {
	recordingsFavoritedCount: number | undefined;
	playbackCompletedPercentage: number;
}

export function useIsSequenceFavorited(
	id: Scalars['ID']
): IUseIsSequenceFavoritedResult {
	const queryClient = useQueryClient();
	const { data } = useSequenceIsFavoritedQuery(
		{ id },
		{
			enabled: !!getSessionToken(),
		}
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
		]
	);
	const recordingsFavoritedCount = data?.sequence?.recordings.aggregate?.count;
	const playbackCompletedPercentage =
		data?.sequence?.viewerPlaybackCompletedPercentage || 0;
	return {
		...result,
		recordingsFavoritedCount,
		playbackCompletedPercentage,
	};
}
