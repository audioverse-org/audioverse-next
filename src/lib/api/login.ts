import { QueryClient } from 'react-query';

import { setSessionToken } from '@lib/cookies';
import { login as _login } from '@lib/generated/graphql';

export const USER_SESSION_QUERY_KEYS = [
	['getWithAuthGuardData'],
	['getProfileData'],
	['isCollectionFavorited'],
	['collectionIsFavorited'],
	['isRecordingFavorited'],
	['isSequenceFavorited'],
	['sequenceIsFavorited'],
	['isSponsorFavorited'],
];

export async function resetUserQueries(
	queryClient: QueryClient
): Promise<void> {
	await Promise.all(
		USER_SESSION_QUERY_KEYS.map((key) => queryClient.resetQueries(key))
	);
}

export async function refetchUserQueries(
	queryClient: QueryClient
): Promise<void> {
	await Promise.all(
		USER_SESSION_QUERY_KEYS.map((key) => queryClient.refetchQueries(key))
	);
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
