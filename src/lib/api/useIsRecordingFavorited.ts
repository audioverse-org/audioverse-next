import { setRecordingFavorited } from '@lib/api/setRecordingFavorited';
import { Scalars } from '@lib/generated/graphql';

import { recordingIsFavorited } from './recordingIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

export function useIsRecordingFavorited(
	id: Scalars['ID']
): IUseIsFavoritedResult {
	return useIsFavorited(
		['isRecordingFavorited', id],
		() => recordingIsFavorited(id),
		(isFavorited) => setRecordingFavorited(id, isFavorited)
	);
}
