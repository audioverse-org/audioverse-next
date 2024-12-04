import pMemoize from 'p-memoize';
import pThrottle from 'p-throttle';

const API_URL = 'https://4.dbt.io/api';
const API_KEY = process.env.BIBLE_BRAIN_KEY;

const throttle = pThrottle({ limit: 10, interval: 1000 });

async function getResponse<T extends Record<string, unknown>>(
	route: string,
): Promise<T | null> {
	const result = await fetch(`${API_URL}${route}&v=4&key=${API_KEY}`, {
		method: 'GET',
	});

	const text = await result.text();

	try {
		return JSON.parse(text);
	} catch (e) {
		console.error(e);
		console.log(text);
		return null;
	}
}

export default pMemoize(throttle(getResponse));
