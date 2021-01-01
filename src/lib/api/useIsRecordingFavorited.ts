import {
	UseMutateFunction,
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query';

import { isRecordingFavorited as _isFavorited } from '@lib/api/isRecordingFavorited';
import { setRecordingFavorited as _setFavorited } from '@lib/api/setRecordingFavorited';

export function useIsRecordingFavorited(
	id: string
): { isFavorited: boolean | undefined; toggleFavorited: UseMutateFunction } {
	const queryClient = useQueryClient();
	const queryKey = ['isFavorited', id];

	const { data: isFavorited } = useQuery(queryKey, async () =>
		_isFavorited(id)
	);

	const { mutate: toggleFavorited } = useMutation(
		() => {
			// TODO: Consider using setFavorited response to update data instead of
			//  invalidating `isFavorited` query

			return _setFavorited(id, !isFavorited);
		},
		{
			onMutate: async () => {
				await queryClient.cancelQueries(queryKey);

				const snapshot = isFavorited;

				queryClient.setQueryData(queryKey, !isFavorited);

				return () => queryClient.setQueryData(queryKey, snapshot);
			},
			onError: (err, variables, rollback) => {
				if (rollback) {
					rollback();
				}
			},
		}
	);

	return { isFavorited, toggleFavorited };
}
