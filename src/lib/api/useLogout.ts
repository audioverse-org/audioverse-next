import { useQueryClient } from 'react-query';

import { clearSessionToken } from '@lib/cookies';

import { invalidateAndResetUserQueries } from '.';

export function useLogout(): Promise<void> {
	const queryClient = useQueryClient();

	clearSessionToken();
	return invalidateAndResetUserQueries(queryClient);
}
