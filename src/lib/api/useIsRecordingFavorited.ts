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
): {
	isPersonFavorited: boolean | undefined;
	toggleFavorited: UseMutateFunction;
} {
	const queryClient = useQueryClient();
	const queryKey = ['isRecordingFavorited', id];

	const { data: isPersonFavorited } = useQuery(queryKey, async () =>
		_isFavorited(id)
	);

	const { mutate: toggleFavorited } = useMutation(
		() => {
			// TODO: Consider using setFavorited response to update data instead of
			//  invalidating `isFavorited` query

			return _setFavorited(id, !isPersonFavorited);
		},
		{
			onMutate: async () => {
				await queryClient.cancelQueries(queryKey);

				const snapshot = isPersonFavorited;

				queryClient.setQueryData(queryKey, !isPersonFavorited);

				return () => queryClient.setQueryData(queryKey, snapshot);
			},
			onError: (err, variables, rollback) => {
				if (rollback) {
					rollback();
				}
			},
		}
	);

	return { isPersonFavorited, toggleFavorited };
}
