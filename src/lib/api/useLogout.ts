import { useQueryClient } from 'react-query';

import { clearSessionToken } from '@lib/cookies';

import { invalidateAndResetUserQueries } from '.';

export function useLogout(): void {
	const queryClient = useQueryClient();

	clearSessionToken();
	invalidateAndResetUserQueries(queryClient);
}
