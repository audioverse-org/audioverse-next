import { useQueryClient } from 'react-query';

import { clearSessionToken } from '@lib/cookies';

import { invalidateAndResetUserQueries } from '.';

export function useLogout(): Promise<any> {
	const queryClient = useQueryClient();

	clearSessionToken();
	return invalidateAndResetUserQueries(queryClient);
}
