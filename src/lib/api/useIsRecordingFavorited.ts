import { useQueryClient } from 'react-query';

import { setRecordingFavorited } from '@lib/api/setRecordingFavorited';

import { recordingIsFavorited } from './recordingIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

export const RECORDING_FAVORITED_QUERY_KEY_PREFIX = 'isRecordingFavorited';

export function useIsRecordingFavorited(
	recordingId: Scalars['ID'],
	sequenceId?: Scalars['ID'],
	disabled?: boolean
): IUseIsFavoritedResult {
	const queryClient = useQueryClient();

	const queryKey = [
		RECORDING_FAVORITED_QUERY_KEY_PREFIX,
		{ recordingId, sequenceId },
	];

	const favoritedQueryFn = () => {
		if (disabled) {
			return Promise.resolve(false);
		}

		return recordingIsFavorited(recordingId);
	};

	const setFavoriteQueryFn = (isFavorited: boolean) => {
		return setRecordingFavorited(recordingId, isFavorited).then((result) => {
			if (!isFavorited && sequenceId) {
				// When a recording in a sequence is unfavorited the sequence is unfavorited
				queryClient.setQueryData(['isSequenceFavorited', sequenceId], false);
			}
			return result;
		});
	};

	const invalidateQueryKeys = [['sequenceIsFavorited', { id: sequenceId }]];

	return useIsFavorited(
		queryKey,
		favoritedQueryFn,
		setFavoriteQueryFn,
		invalidateQueryKeys
	);
}
