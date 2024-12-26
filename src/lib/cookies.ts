import cookie from 'cookie';
import { IncomingMessage } from 'http';
import JSCookie from 'js-cookie';

const SESSION_TOKEN_KEY = 'session_token';
const USER_ID_KEY = 'user_id';
const LANGUAGE_KEY = 'lang';

export function getSessionToken(
	req: IncomingMessage | null = null,
): string | undefined {
	return getCookies(req)[SESSION_TOKEN_KEY];
}

export function getUserId(
	req: IncomingMessage | null = null,
): string | undefined {
	return getCookies(req)[USER_ID_KEY];
}

export function getLanguageId(
	req: IncomingMessage | null = null,
): string | undefined {
	return getCookies(req)[LANGUAGE_KEY];
}

export function setSessionTokenAndUserId(token: string, userId: string): void {
	JSCookie.set(SESSION_TOKEN_KEY, token, { expires: 14 });
	JSCookie.set(USER_ID_KEY, userId, { expires: 14 });
}

export function setLanguageId(lang: string): void {
	JSCookie.set(LANGUAGE_KEY, lang, { expires: 365 });
}

export function clearSessionTokenAndUserId(): void {
	JSCookie.remove(SESSION_TOKEN_KEY);
	JSCookie.remove(USER_ID_KEY);
}

function getCookies(req: IncomingMessage | null): {
	[key: string]: string;
} {
	if (req) {
		return cookie.parse(req.headers.cookie || '');
	}

	// https://github.com/vercel/next.js/issues/2177#issuecomment-536178575
	if (typeof window !== 'undefined') {
		return JSCookie.get();
	}

	return {};
}
