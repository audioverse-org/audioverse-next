import { useQueryClient } from '@tanstack/react-query';

import { clearSessionTokenAndUserId } from '~lib/cookies';
import isServerSide from '~lib/isServerSide';

import { resetUserQueries } from './login';

export function useLogout(): Promise<void> {
	const queryClient = useQueryClient();

	clearSessionTokenAndUserId();

	if (!isServerSide()) {
		window.Beacon && window.Beacon('logout');
	}

	return resetUserQueries(queryClient);
}
