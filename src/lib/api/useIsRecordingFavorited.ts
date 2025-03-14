import { useQueryClient } from '@tanstack/react-query';

import { setRecordingFavorited } from '~lib/api/setRecordingFavorited';
import { Scalars } from '~src/__generated__/graphql';

import { recordingIsFavorited } from './recordingIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

export const RECORDING_FAVORITED_QUERY_KEY_PREFIX = 'isRecordingFavorited';

export function useIsRecordingFavorited(
	recordingId: Scalars['ID']['output'],
	sequenceId?: Scalars['ID']['output'],
	disabled?: boolean,
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

	const setFavoriteQueryFn = async (isFavorited: boolean) => {
		const result = await setRecordingFavorited(recordingId, isFavorited);
		if (!isFavorited && sequenceId) {
			// When a recording in a sequence is unfavorited the sequence is unfavorited
			queryClient.setQueryData(['isSequenceFavorited', sequenceId], false);
		}
		return result;
	};

	const invalidateQueryKeys = [['sequenceIsFavorited', { id: sequenceId }]];

	return useIsFavorited(
		queryKey,
		favoritedQueryFn,
		setFavoriteQueryFn,
		invalidateQueryKeys,
	);
}
