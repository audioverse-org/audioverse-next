import { IncomingMessage } from 'http';

import cookie from 'cookie';
import JSCookie from 'js-cookie';
import get from 'lodash/get';

const SESSION_KEY = 'avSession';
const LANGUAGE_KEY = 'lang';

export function getSessionToken(
	req: IncomingMessage | null = null
): string | undefined {
	return getCookies(req)[SESSION_KEY];
}

export function getLanguageId(
	req: IncomingMessage | null = null
): string | undefined {
	return getCookies(req)[LANGUAGE_KEY];
}

export function setSessionToken(token: string): void {
	JSCookie.set(SESSION_KEY, token);
}

export function setLanguageId(lang: string): void {
	JSCookie.set(LANGUAGE_KEY, lang, { expires: 365 });
}

export function clearSessionToken(): void {
	JSCookie.remove(SESSION_KEY);
}

function getCookies(req: IncomingMessage | null): {
	[key: string]: string;
} {
	if (req) {
		return cookie.parse(get(req.headers, 'cookie') || '');
	}

	// https://github.com/vercel/next.js/issues/2177#issuecomment-536178575
	if (typeof window !== 'undefined') {
		return JSCookie.get();
	}

	return {};
}
