import { useContext } from 'react';
import {
	UseMutateFunction,
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query';

import { AuthBarrierContext } from '@components/templates/andAuthBarrier';
import { getSessionToken } from '@lib/cookies';

export type IUseIsFavoritedResult = {
	isFavorited: boolean | undefined;
	toggleFavorited: UseMutateFunction;
	isLoading: boolean;
};

export function useIsFavorited(
	queryKey: Array<string | number>,
	isFavoritedQueryFn: () => Promise<boolean>,
	setFavoritedQueryFn: (isFavorited: boolean) => Promise<boolean>
): IUseIsFavoritedResult {
	const context = useContext(AuthBarrierContext);
	const queryClient = useQueryClient();

	const { data: isFavorited, isLoading } = useQuery(queryKey, () => {
		if (getSessionToken()) {
			return isFavoritedQueryFn();
		}
		return false;
	});

	const { mutate: toggleFavorited } = useMutation(
		() => {
			if (!getSessionToken()) {
				context.challenge();
			}
			return setFavoritedQueryFn(!isFavorited);
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

	return { isFavorited, toggleFavorited, isLoading };
}
