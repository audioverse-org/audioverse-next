import { useGetWithAuthGuardDataQuery } from '~components/HOCs/__generated__/withAuthGuard';

export default function useIsAuthenticated(): {
	isUserLoggedIn: boolean;
	isLoading: boolean;
} {
	const { data, isLoading } = useGetWithAuthGuardDataQuery(
		{},
		{ retry: false }
	);

	return { isUserLoggedIn: !!data?.me?.user.email, isLoading };
}
