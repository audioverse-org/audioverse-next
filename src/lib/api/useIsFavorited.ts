import { useMutation, useQuery, useQueryCache } from 'react-query';

import { isFavorited } from '@lib/api/isFavorited';
import { setFavorited } from '@lib/api/setFavorited';

export function useIsFavorited(
	id: string
): { isFavorited: boolean | undefined; toggle: () => void } {
	const cache = useQueryCache();
	const queryKey = ['isFavorited', id];

	const { data: faved } = useQuery(queryKey, async () => isFavorited(id));

	const [toggle] = useMutation(
		() => {
			// TODO: Consider using setFavorited response to update data instead of
			//  invalidating `isFavorited` query

			// onMutate optimistically changes cached data, so we don't
			// flip faved since it's already been flipped in onMutate
			return setFavorited(id, !!faved);
		},
		{
			onMutate: () => {
				cache.cancelQueries(queryKey);

				const previousFaved = faved;

				cache.setQueryData(queryKey, !faved);

				return () => cache.setQueryData(queryKey, previousFaved);
			},
			onError: (err, options, rollback) => rollback(),
		}
	);

	return { isFavorited: faved, toggle };
}
