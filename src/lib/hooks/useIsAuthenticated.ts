import { getSessionToken } from '../cookies';
import { useGetIsAuthenticatedQuery } from './__generated__/useIsAuthenticated';

export default function useIsAuthenticated(): {
	isUserLoggedIn: boolean;
	isFetching: boolean;
	user?: { name: string; email: string };
} {
	const hasSessionToken = !!getSessionToken();
	const { data, isFetching } = useGetIsAuthenticatedQuery(
		{},
		{ retry: false, enabled: hasSessionToken },
	);

	return {
		isUserLoggedIn: !!data?.me?.user.email,
		isFetching,
		user: data?.me?.user,
	};
}
