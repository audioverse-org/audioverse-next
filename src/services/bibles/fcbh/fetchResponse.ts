import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

const FCBH_API_BASE = 'https://4.dbt.io/api';

const fetchResponse = manageAsyncFunction(
	async <T extends Record<string, unknown>>(route: string): Promise<T> => {
		// Clean up the route by removing query params and normalizing slashes
		const cleanRoute = route
			.split('?')[0] // Remove query string
			.replace(/\/+/g, '/') // Replace multiple slashes with single slash
			.replace(/^\//, ''); // Remove leading slash

		// During SSR/build, use FCBH API directly. In browser, proxy through Next.js API
		const baseUrl = typeof window === 'undefined' ? FCBH_API_BASE : '/api/fcbh';

		// Construct URL without using URL constructor to avoid path normalization
		const url = baseUrl.replace(/\/$/, '') + '/' + cleanRoute;

		const result = await fetch(url, {
			method: 'GET',
			headers: typeof window === 'undefined' ? {
				'v': '4',
				'key': process.env.FCBH_API_KEY || '',
			} : {},
		});

		if (!result.ok) {
			throw new Error(
				`FCBH request failed: ${result.status} ${result.statusText}`,
			);
		}

		const data = await result.json();
		return data as T;
	},
);

export default fetchResponse;
