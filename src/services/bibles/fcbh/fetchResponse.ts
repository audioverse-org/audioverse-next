import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

import { FCBH_API_BASE } from '../constants';

const fetchResponse = manageAsyncFunction(
	async <T extends Record<string, unknown>>(route: string): Promise<T> => {
		const cleanRoute = route
			.split('?')[0] // Remove query string
			.replace(/\/+/g, '/') // Replace multiple slashes with single slash
			.replace(/^\//, ''); // Remove leading slash

		const shouldProxy = typeof window !== 'undefined';
		const baseUrl = shouldProxy ? '/api/fcbh' : FCBH_API_BASE;
		const url = baseUrl.replace(/\/$/, '') + '/' + cleanRoute;
		const headers: HeadersInit = shouldProxy
			? {}
			: {
					v: '4',
					key: process.env.FCBH_API_KEY || '',
				};

		const result = await fetch(url, {
			method: 'GET',
			headers,
		});

		if (!result.ok) {
			throw new Error(
				`FCBH request failed: ${result.status} ${result.statusText}`,
			);
		}

		return result.json() as Promise<T>;
	},
);

export default fetchResponse;
