import { useQueryClient } from 'react-query';

import { setRecordingFavorited } from '@lib/api/setRecordingFavorited';
import { Scalars } from '@lib/generated/graphql';

import { recordingIsFavorited } from './recordingIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

export const RECORDING_FAVORITED_QUERY_KEY_PREFIX = 'isRecordingFavorited';

export function useIsRecordingFavorited(
	recordingId: Scalars['ID'],
	sequenceId?: Scalars['ID']
): IUseIsFavoritedResult {
	const queryClient = useQueryClient();
	return useIsFavorited(
		[RECORDING_FAVORITED_QUERY_KEY_PREFIX, { recordingId, sequenceId }],
		() => recordingIsFavorited(recordingId),
		(isFavorited) =>
			setRecordingFavorited(recordingId, isFavorited).then((result) => {
				if (!isFavorited && sequenceId) {
					// When a recording in a sequence is unfavorited the sequence is unfavorited
					queryClient.setQueryData(['isSequenceFavorited', sequenceId], false);
				}
				return result;
			}),
		[['sequenceIsFavorited', { id: sequenceId }]]
	);
}
