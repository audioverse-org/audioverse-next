import React from 'react';
import { useMutation, useQuery, useQueryCache } from 'react-query';

import { isFavorited, setFavorited } from '@lib/api';

export default function Favorite({ id }: { id: string }): JSX.Element {
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

	return (
		<button
			onClick={async () => {
				await toggle();
			}}
		>
			{faved ? 'Unfavorite' : 'Favorite'}
		</button>
	);
}
