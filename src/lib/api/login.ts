import { QueryClient } from '@tanstack/react-query';

import { setSessionToken } from '~lib/cookies';

import { analytics } from '../analytics';
import { login as _login } from './__generated__/login';

export const USER_SESSION_QUERY_KEYS = [
	['getWithAuthGuardData'],
	['getProfileData'],
	['isCollectionFavorited'],
	['collectionIsFavorited'],
	['isRecordingFavorited'],
	['isSequenceFavorited'],
	['sequenceIsFavorited'],
	['isSponsorFavorited'],
	['getDiscoverPageData'],
	['getSectionContinueListening'],
	['getSectionContinueListening.infinite'],
];

export async function resetUserQueries(
	queryClient: QueryClient
): Promise<void> {
	await Promise.all(
		USER_SESSION_QUERY_KEYS.map((key) => queryClient.removeQueries(key))
	);
}

export async function refetchUserQueries(
	queryClient: QueryClient
): Promise<void> {
	await Promise.all(
		USER_SESSION_QUERY_KEYS.map((key) => queryClient.refetchQueries(key))
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
		return true;
	}
	throw new Error((errors?.length && errors[0].message) || '');
}
