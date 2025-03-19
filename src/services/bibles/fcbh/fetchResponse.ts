import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

import { FCBH_API_BASE } from '../constants';

const fetchResponse = manageAsyncFunction(
	async <T extends Record<string, unknown>>(route: string): Promise<T> => {
		const cleanRoute = route
			.split('?')[0] // Remove query string
			.replace(/\/+/g, '/') // Replace multiple slashes with single slash
			.replace(/^\//, ''); // Remove leading slash

		const url = `${FCBH_API_BASE}/${cleanRoute}?v=4&key=${process.env.NEXT_PUBLIC_BIBLE_BRAIN_KEY}`;
		const result = await fetch(url);

		if (!result.ok) {
			throw new Error(
				`FCBH request failed: ${result.status} ${result.statusText}`,
			);
		}

		return result.json() as Promise<T>;
	},
);

export default fetchResponse;
