import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

const fetchResponse = manageAsyncFunction(
	async <T extends Record<string, unknown>>(route: string): Promise<T> => {
		// Clean up the route by removing query params and normalizing slashes
		const cleanRoute = route
			.split('?')[0] // Remove query string
			.replace(/\/+/g, '/') // Replace multiple slashes with single slash
			.replace(/^\//, ''); // Remove leading slash

		// Ensure we have a complete URL with protocol and host
		const baseUrl =
			typeof window === 'undefined'
				? 'http://localhost:3000' // Server-side
				: window.location.origin; // Client-side

		const url = new URL(`/api/fcbh/${cleanRoute}`, baseUrl).toString();

		const result = await fetch(url, {
			method: 'GET',
		});

		if (!result.ok) {
			throw new Error(
				`FCBH request failed: ${result.status} ${result.statusText}`,
			);
		}

		return result.json();
	},
);

export default fetchResponse;
