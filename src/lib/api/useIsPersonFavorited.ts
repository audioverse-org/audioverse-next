import { setPersonFavorited } from '@lib/api/setPersonFavorited';

import { personIsFavorited } from './personIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';
import { Scalars } from '@src/__generated__/graphql';

export function useIsPersonFavorited(id: Scalars['ID']): IUseIsFavoritedResult {
	return useIsFavorited(
		['isPersonFavorited', id],
		() => personIsFavorited(id),
		(isFavorited) => setPersonFavorited(id, isFavorited)
	);
}
