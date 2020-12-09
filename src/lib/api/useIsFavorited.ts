import { useMutation, useQuery, useQueryCache } from 'react-query';

import { isFavorited as _isFavorited } from '@lib/api/isFavorited';
import { setFavorited as _setFavorited } from '@lib/api/setFavorited';

export function useIsFavorited(
	id: string
): { isFavorited: boolean | undefined; toggleFavorited: () => void } {
	const cache = useQueryCache();
	const queryKey = ['isFavorited', id];

	const { data: isFavorited } = useQuery(queryKey, async () =>
		_isFavorited(id)
	);

	const [toggleFavorited] = useMutation(
		() => {
			// TODO: Consider using setFavorited response to update data instead of
			//  invalidating `isFavorited` query

			// TODO: Figure out how to make this data flow less convoluted
			// onMutate optimistically changes cached data, so we don't
			// flip faved since it's already been flipped in onMutate
			return _setFavorited(id, !!isFavorited);
		},
		{
			onMutate: () => {
				cache.cancelQueries(queryKey);

				const snapshot = isFavorited;

				cache.setQueryData(queryKey, !isFavorited);

				return () => cache.setQueryData(queryKey, snapshot);
			},
			onError: (err, variables, rollback) => rollback(),
		}
	);

	return { isFavorited, toggleFavorited };
}
