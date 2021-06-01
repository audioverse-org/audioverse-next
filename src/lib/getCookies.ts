import { IncomingMessage } from 'http';

import cookie from 'cookie';
import _ from 'lodash';

// TODO: Improve req type
export default function getCookies(
	req: IncomingMessage | null
): { [key: string]: string } {
	if (req) {
		return cookie.parse(_.get(req.headers, 'cookie') || '');
	}

	// https://github.com/vercel/next.js/issues/2177#issuecomment-536178575
	if (typeof window !== 'undefined') {
		return cookie.parse(_.get(document, 'cookie'));
	}

	return {};
}
