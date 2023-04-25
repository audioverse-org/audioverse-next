import { useQueryClient } from 'react-query';

import { clearSessionToken } from '~lib/cookies';
import isServerSide from '~lib/isServerSide';

import { resetUserQueries } from './login';

export function useLogout(): Promise<void> {
	const queryClient = useQueryClient();

	clearSessionToken();

	if (!isServerSide()) {
		window.Beacon && window.Beacon('logout');
	}

	return resetUserQueries(queryClient);
}
