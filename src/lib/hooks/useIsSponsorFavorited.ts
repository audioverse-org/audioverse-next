import { setSponsorFavorited } from '@lib/api/setSponsorFavorited';
import { Scalars } from '@src/__generated__/graphql';

import { sponsorIsFavorited } from '../api/sponsorIsFavorited';
import { IUseIsFavoritedResult, useIsFavorited } from './useIsFavorited';

export function useIsSponsorFavorited(
	id: Scalars['ID']
): IUseIsFavoritedResult {
	return useIsFavorited(
		['isSponsorFavorited', id],
		() => sponsorIsFavorited(id),
		(isFavorited) => setSponsorFavorited(id, isFavorited)
	);
}
