import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

const fetchResponse = manageAsyncFunction(
	async <T extends Record<string, unknown>>(route: string): Promise<T> => {
		const apiUrl = 'https://4.dbt.io/api';
		const apiKey = process.env.BIBLE_BRAIN_KEY;

		const result = await fetch(`${apiUrl}${route}&v=4&key=${apiKey}`, {
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
