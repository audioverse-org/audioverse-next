import { useCallback } from 'react';

import { useGetWithAuthGuardDataQuery } from '~src/components/HOCs/__generated__/withAuthGuard';

import { getSessionToken } from '../cookies';

export default function useRequireUser() {
	const sessionToken = getSessionToken();
	const authResult = useGetWithAuthGuardDataQuery(
		{},
		{
			enabled: !!sessionToken,
			retry: false,
		}
	);
	const user = authResult.data?.me?.user;

	const requireUser = useCallback(
		(callback: () => void) => (): void => {
			if (!user) {
				return;
			}
			callback();
		},
		[user]
	);

	return requireUser;
}
