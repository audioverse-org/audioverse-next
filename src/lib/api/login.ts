import { QueryClient } from 'react-query';

import { setSessionToken } from '@lib/cookies';

import { login as _login } from './login.generated';

export const USER_SESSION_QUERY_KEYS = [
	['getWithAuthGuardData'],
	['getProfileData'],
];

export function invalidateAndResetUserQueries(
	queryClient: QueryClient
): Promise<void> {
	return Promise.all(
		USER_SESSION_QUERY_KEYS.map((key) => queryClient.invalidateQueries(key))
	).then(async () => {
		await USER_SESSION_QUERY_KEYS.map((key) => queryClient.resetQueries(key));
	});
}

export async function login(email: string, password: string): Promise<boolean> {
	const {
		login: { authenticatedUser },
	} = await _login({ email, password });
	if (authenticatedUser) {
		setSessionToken(authenticatedUser.sessionToken);
		return true;
	}
	return false;
}
