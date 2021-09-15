import { setSequenceFavorited } from '@lib/api/setSequenceFavorited';
import { Scalars } from '@lib/generated/graphql';

import { sequenceIsFavorited } from './sequenceIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

export function useIsSequenceFavorited(
	id: Scalars['ID']
): IUseIsFavoritedResult {
	return useIsFavorited(
		['isSequenceFavorited', id],
		() => sequenceIsFavorited(id),
		(isFavorited) => setSequenceFavorited(id, isFavorited)
	);
}
