import {
	UseMutateFunction,
	useMutation,
	useQuery,
	useQueryClient,
} from 'react-query';

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
	const queryClient = useQueryClient();

	const { data: isFavorited, isLoading } = useQuery(
		queryKey,
		isFavoritedQueryFn
	);

	const { mutate: toggleFavorited } = useMutation(
		() => setFavoritedQueryFn(!isFavorited),
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
