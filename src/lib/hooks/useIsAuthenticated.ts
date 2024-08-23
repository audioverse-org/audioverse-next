import { UseQueryResult } from '@tanstack/react-query';

import {
	GetWithAuthGuardDataQuery,
	useGetWithAuthGuardDataQuery,
} from '~components/HOCs/__generated__/withAuthGuard';
import { getSessionToken } from '~lib/cookies';

import { getCurrentRequest } from '../api/storeRequest';

export default function useIsAuthenticated(): UseQueryResult<
	GetWithAuthGuardDataQuery,
	unknown
> & {
	isUserLoggedIn: boolean;
} {
	const token = getSessionToken(getCurrentRequest());
	const result = useGetWithAuthGuardDataQuery(
		{},
		{ retry: false, enabled: !!token }
	);

	return {
		...result,
		isUserLoggedIn: !!token && !!result.data?.me?.user.email,
	};
}
