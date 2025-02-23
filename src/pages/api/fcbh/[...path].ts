import { NextApiRequest, NextApiResponse } from 'next';

import { FCBH_API_BASE } from '~src/services/bibles/constants';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { path } = req.query;
	const pathArray = Array.isArray(path) ? path : [path];
	const apiUrl = FCBH_API_BASE;
	const apiKey = process.env.BIBLE_BRAIN_KEY;

	try {
		// Clean up the path array and join with single slashes
		const cleanPath = pathArray
			.filter(Boolean) // Remove empty segments
			.join('/');

		// Ensure v=4 parameter is included
		const url = new URL(`${apiUrl}/${cleanPath}`);
		url.searchParams.set('v', '4');
		url.searchParams.set('key', apiKey || '');

		console.debug(
			'FCBH API request:',
			url.toString().replace(apiKey || '', '[REDACTED]'),
		);

		const result = await fetch(url, { method: 'GET' });

		if (!result.ok) {
			const error = `FCBH request failed: ${result.status} ${result.statusText}`;
			console.error(error, {
				url: url.toString().replace(apiKey || '', '[REDACTED]'),
			});
			throw new Error(error);
		}

		const data = await result.json();
		res.status(200).json(data);
	} catch (error) {
		console.error('FCBH API error:', error);
		res.status(500).json({ error: 'Failed to fetch from FCBH API' });
	}
}
