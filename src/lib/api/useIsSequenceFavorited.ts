import { useQueryClient } from 'react-query';

import { setSequenceFavorited } from '@lib/api/setSequenceFavorited';
import {
	Scalars,
	SequenceIsFavoritedQuery,
	useSequenceIsFavoritedQuery,
} from '@lib/generated/graphql';

import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

import { RECORDING_FAVORITED_QUERY_KEY_PREFIX } from '.';

interface IUseIsSequenceFavoritedResult extends IUseIsFavoritedResult {
	recordingsFavoritedCount: number | undefined;
}

export function useIsSequenceFavorited(
	id: Scalars['ID']
): IUseIsSequenceFavoritedResult {
	const queryClient = useQueryClient();
	const { data } = useSequenceIsFavoritedQuery({ id });
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
	return {
		...result,
		recordingsFavoritedCount,
	};
}
