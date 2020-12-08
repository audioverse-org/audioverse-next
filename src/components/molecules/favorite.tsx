import React from 'react';
import { useMutation, useQuery, useQueryCache } from 'react-query';

import { isFavorited, setFavorited } from '@lib/api';

export default function Favorite({ id }: { id: string }): JSX.Element {
	const cache = useQueryCache();

	const { data: faved } = useQuery(['isFavorited', id], async () =>
		isFavorited(id)
	);

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
				cache.cancelQueries('isFavorited');

				const previousFaved = faved;

				cache.setQueryData(['isFavorited', id], !faved);

				return () => cache.setQueryData(['isFavorited', id], previousFaved);
			},
			onError: (err, options, rollback) => rollback(),
		}
	);

	const label = faved ? 'Unfavorite' : 'Favorite';

	return (
		<button
			onClick={async () => {
				await toggle();
			}}
		>
			{label}
		</button>
	);
}
