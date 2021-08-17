import {
	UseMutateFunction,
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query';

import { isPersonFavorited as _isPersonFavorited } from '@lib/api/isPersonFavorited';
import { setPersonFavorited } from '@lib/api/setPersonFavorited';

export function useIsPersonFavorited(id: string): {
	isPersonFavorited: boolean | undefined;
	toggleFavorited: UseMutateFunction;
	isLoading: boolean;
} {
	const queryClient = useQueryClient();
	const queryKey = ['isPersonFavorited', id];

	const { data: isPersonFavorited, isLoading } = useQuery(queryKey, () =>
		_isPersonFavorited(id)
	);

	const { mutate: toggleFavorited } = useMutation(
		() => setPersonFavorited(id, !isPersonFavorited),
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

	return { isPersonFavorited, toggleFavorited, isLoading };
}
