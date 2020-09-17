const API_URL = 'https://graphql-staging.audioverse.org/graphql';

export async function fetchAPI(query: string, { variables = {} } = {}) {
	const headers = { 'Content-Type': 'application/json' };

	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const json = await res.json();
	if (json.errors) {
		console.error({
			query,
			variables,
			errors: json.errors,
		});
		throw new Error('Failed to fetch API');
	}
	return json.data;
}
