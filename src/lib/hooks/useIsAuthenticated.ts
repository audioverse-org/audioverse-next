import { UseQueryResult } from '@tanstack/react-query';

import { useGetWithAuthGuardDataQuery } from '~components/HOCs/__generated__/withAuthGuard';
import { getSessionToken } from '~lib/cookies';

import { GetWithAuthGuardDataQuery } from '../__generated__/useIsAuthenticated';

export default function useIsAuthenticated(): UseQueryResult<
	GetWithAuthGuardDataQuery,
	unknown
> & {
	isUserLoggedIn: boolean;
} {
	const token = getSessionToken();
	const result = useGetWithAuthGuardDataQuery(
		{},
		{ retry: false, enabled: !!token }
	);

	return {
		...result,
		isUserLoggedIn: !!token && !!result.data?.me?.user.email,
	};
}
