import { QueryClient } from '@tanstack/react-query';

import { setSessionToken } from '~lib/cookies';
import { gtmPushEvent } from '~src/utils/gtm';

import { analytics } from '../analytics';
import { login as _login } from './__generated__/login';

export const USER_SESSION_QUERY_KEYS = [
	['getIsAuthenticated'],
	['getProfileData'],
	['isCollectionFavorited'],
	['collectionIsFavorited'],
	['isRecordingFavorited'],
	['isSequenceFavorited'],
	['sequenceIsFavorited'],
	['isSponsorFavorited'],
];

export async function resetUserQueries(
	queryClient: QueryClient,
): Promise<void> {
	await Promise.all(
		USER_SESSION_QUERY_KEYS.map((queryKey) =>
			queryClient.resetQueries({ queryKey }),
		),
	);
}

export async function refetchUserQueries(
	queryClient: QueryClient,
): Promise<void> {
	await Promise.all(
		USER_SESSION_QUERY_KEYS.map((queryKey) =>
			queryClient.refetchQueries({ queryKey }),
		),
	);
}

export async function login(email: string, password: string): Promise<true> {
	const {
		login: { authenticatedUser, errors },
	} = await _login({ email, password });
	if (authenticatedUser) {
		setSessionToken(authenticatedUser.sessionToken);
		const user = authenticatedUser.user;
		analytics.identify(user.id + '', {
			firstName: user.givenName,
			lastName: user.surname,
			email,
			source: 'Login',
		});
		gtmPushEvent('sign_in', {
			sign_in_method: 'email',
			user_id: authenticatedUser.user.id,
		});

		return true;
	}
	throw new Error((errors?.length && errors[0].message) || '');
}
