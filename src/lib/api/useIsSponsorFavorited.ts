import { setSponsorFavorited } from '@lib/api/setSponsorFavorited';

import { sponsorIsFavorited } from './sponsorIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';
import { Scalars } from '@src/__generated__/graphql';

export function useIsSponsorFavorited(
	id: Scalars['ID']
): IUseIsFavoritedResult {
	return useIsFavorited(
		['isSponsorFavorited', id],
		() => sponsorIsFavorited(id),
		(isFavorited) => setSponsorFavorited(id, isFavorited)
	);
}
