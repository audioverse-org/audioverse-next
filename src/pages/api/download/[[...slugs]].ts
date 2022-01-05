import type { NextApiRequest, NextApiResponse } from 'next';
import forge from 'node-forge';

import { getSessionToken } from '@lib/cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const path = (req.query.slugs as string[])
		.map((s) => encodeURIComponent(s))
		.join('/');
	const sessionCookie = getSessionToken(req);
	res.redirect(
		`${
			new URL(process.env.NEXT_PUBLIC_API_URL as string).origin
		}/media/download/${path}${
			sessionCookie
				? `?${
						req.query.logonly ? `logOnly=${req.query.logonly}&` : ''
				  }${encryptedSessionTokenParameters(sessionCookie)}`
				: ''
		}`
	);
}

const encryptedSessionTokenParameters = (token: string) => {
	const { SESSION_TOKEN_TRANSPORT_KEY, SESSION_TOKEN_TRANSPORT_IV } =
		process.env;
	if (!SESSION_TOKEN_TRANSPORT_KEY || !SESSION_TOKEN_TRANSPORT_IV) {
		return '';
	}
	const key = forge.util.decode64(SESSION_TOKEN_TRANSPORT_KEY);
	const iv = forge.util.decode64(SESSION_TOKEN_TRANSPORT_IV);

	const cipher = forge.cipher.createCipher('AES-GCM', key);
	cipher.start({
		iv,
	});
	cipher.update(forge.util.createBuffer(token));
	cipher.finish();
	return `sessionToken=${cipher.output.toHex()}&sessionTag=${cipher.mode.tag.toHex()}`;
};
