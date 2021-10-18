import { useQueryClient } from 'react-query';

import { clearSessionToken } from '@lib/cookies';

import { invalidateAndResetUserQueries } from '.';

export function logout(): void {
	const queryClient = useQueryClient();

	clearSessionToken();
	invalidateAndResetUserQueries(queryClient);
}
