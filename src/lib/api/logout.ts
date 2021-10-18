import { useQueryClient } from 'react-query';

import { clearSessionToken } from '@lib/cookies';

export function logout(): void {
	const queryClient = useQueryClient();

	clearSessionToken();
	queryClient
		.invalidateQueries(['getWithAuthGuardData'])
		.then(() => queryClient.resetQueries(['getWithAuthGuardData']));
}
