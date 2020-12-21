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

	if (process && process.browser) {
		return cookie.parse(_.get(document, 'cookie'));
	}

	return {};
}
