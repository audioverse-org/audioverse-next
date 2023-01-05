import { setPersonFavorited } from '@/lib/api/setPersonFavorited';
import { Scalars } from '@/lib/generated/graphql';

import { personIsFavorited } from './personIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

export function useIsPersonFavorited(id: Scalars['ID']): IUseIsFavoritedResult {
	return useIsFavorited(
		['isPersonFavorited', id],
		() => personIsFavorited(id),
		(isFavorited) => setPersonFavorited(id, isFavorited)
	);
}
