import { useQueryClient } from 'react-query';

import { clearSessionToken } from '@lib/cookies';
import getBeacon from '@lib/getBeacon';

import { resetUserQueries } from './login';

export function useLogout(): Promise<void> {
	const queryClient = useQueryClient();

	clearSessionToken();
	const beacon = getBeacon();
	beacon && beacon('logout');

	return resetUserQueries(queryClient);
}
