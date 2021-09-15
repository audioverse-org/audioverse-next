import { setSessionToken } from '@lib/cookies';
import { login as _login } from '@lib/generated/graphql';

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
