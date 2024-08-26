const API_URL = 'https://4.dbt.io/api';
const API_KEY = process.env.BIBLE_BRAIN_KEY;

export default async function getResponse<T extends Record<string, unknown>>(
	route: string,
): Promise<T | null> {
	const result = await fetch(`${API_URL}${route}&v=4&key=${API_KEY}`, {
		method: 'GET',
	});

	try {
		return JSON.parse(await result.text());
	} catch (e) {
		// TODO: Log error
		return null;
	}
}
