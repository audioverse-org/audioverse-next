import { IncomingMessage } from 'http';

import cookie from 'cookie';
import _ from 'lodash';

// TODO: Improve req type
export default function getCookies(
	req: IncomingMessage | null
): { [key: string]: string } {
	return cookie.parse(
		req ? _.get(req.headers, 'cookie') || '' : document.cookie
	);
}
