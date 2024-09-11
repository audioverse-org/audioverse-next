import { UseQueryResult } from '@tanstack/react-query';

import {
	GetWithAuthGuardDataQuery,
	useGetWithAuthGuardDataQuery,
} from '~components/HOCs/__generated__/withAuthGuard';
import { getSessionToken } from '~lib/cookies';

export default function useIsAuthenticated(): UseQueryResult<
	GetWithAuthGuardDataQuery,
	unknown
> & {
	isUserLoggedIn: boolean;
} {
	const token = getSessionToken();
	const result = useGetWithAuthGuardDataQuery({}, { retry: false });

	return {
		...result,
		isUserLoggedIn: !!token && !!result.data?.me?.user.email,
	};
}
