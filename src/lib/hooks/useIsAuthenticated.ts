import { useGetIsAuthenticatedQuery } from './__generated__/useIsAuthenticated';

export default function useIsAuthenticated(): {
	isUserLoggedIn: boolean;
	isFetching: boolean;
	user?: { name: string; email: string };
} {
	const { data, isFetching } = useGetIsAuthenticatedQuery({}, { retry: false });

	return {
		isUserLoggedIn: !!data?.me?.user.email,
		isFetching,
		user: data?.me?.user,
	};
}
