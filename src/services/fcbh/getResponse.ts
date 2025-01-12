import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

const API_URL = 'https://4.dbt.io/api';
const API_KEY = process.env.BIBLE_BRAIN_KEY;

const getResponse = manageAsyncFunction(
	async <T extends Record<string, unknown>>(route: string): Promise<T> => {
		const result = await fetch(`${API_URL}${route}&v=4&key=${API_KEY}`, {
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

export default getResponse;
