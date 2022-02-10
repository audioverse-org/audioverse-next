import { useQueryClient } from 'react-query';

import { clearSessionToken } from '@lib/cookies';

import { resetUserQueries } from '.';

export function useLogout(): Promise<void> {
	const queryClient = useQueryClient();

	clearSessionToken();
	return resetUserQueries(queryClient);
}
