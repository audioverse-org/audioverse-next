import {
	UseMutateFunction,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { GlobalModalsContext } from '~components/templates/andGlobalModals';
import { getSessionToken } from '~lib/cookies';

export type IUseIsFavoritedResult = {
	isFavorited: boolean | undefined;
	toggleFavorited: UseMutateFunction;
	isLoading: boolean;
};

type IQueryKey = Array<string | number | Record<string, unknown>>;

export function useIsFavorited(
	queryKey: IQueryKey,
	isFavoritedQueryFn: () => boolean | Promise<boolean>,
	setFavoritedQueryFn: (isFavorited: boolean) => Promise<boolean>,
	invalidateQueryKeys: IQueryKey[] = []
): IUseIsFavoritedResult {
	const context = useContext(GlobalModalsContext);
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data: isFavorited, isLoading } = useQuery(queryKey, () => {
		if (getSessionToken()) {
			return isFavoritedQueryFn();
		}
		return false;
	});

	const { mutate } = useMutation(() => setFavoritedQueryFn(!isFavorited), {
		onMutate: async () => {
			await queryClient.cancelQueries(queryKey);

			const snapshot = isFavorited;

			queryClient.setQueryData(queryKey, !isFavorited);

			return { snapshot };
		},
		onError: (err, variables, context) => {
			if (context?.snapshot !== undefined) {
				queryClient.setQueryData(queryKey, context.snapshot);
			}
		},
		onSettled: () => {
			const keys = [queryKey, ...invalidateQueryKeys, ['getLibraryData']];
			keys.map((k) => queryClient.invalidateQueries(k));
		},
	});

	const toggleFavorited = () => {
		const isLoggedOut = !getSessionToken();
		if (isLoggedOut) {
			return context.challengeAuth(() => mutate());
		}
		const requiresConfirmation = router.pathname.includes(
			'/[language]/library'
		);
		if (isFavorited && requiresConfirmation) {
			return context.confirmRemoveFavorite(() => mutate());
		}
		return mutate();
	};

	return { isFavorited, toggleFavorited, isLoading };
}
