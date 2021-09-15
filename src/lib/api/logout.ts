import { clearSessionToken } from '@lib/cookies';

export function logout(): void {
	clearSessionToken();
}
