import { getCurrentRequest } from '@lib/api/storeRequest';
import { getSessionToken } from '@lib/cookies';
import { sleep } from '@lib/sleep';

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'https://graphql-staging.audioverse.org/graphql';

async function getResponse(
	headers: HeadersInit,
	query: string,
	variables: unknown
) {
	return fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	});
}

export async function fetchApi<TData>(
	query: string,
	{ variables = {} } = {}
): Promise<TData> {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	const sessionToken = getSessionToken(getCurrentRequest());
	if (sessionToken) {
		headers['x-av-session'] = sessionToken;
	}

	let res = await getResponse(headers, query, variables);
	let text = await res.text();

	if (!res.ok) {
		await sleep({ ms: 10000 });
		res = await getResponse(headers, query, variables);
		text = await res.text();
	}

	if (!res.ok) {
		console.error('Response is not ok', {
			text,
			res,
			query,
			variables,
			headers,
		});
		throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);
	}

	let json;

	try {
		json = JSON.parse(text);
	} catch (error) {
		console.error('Failed to parse JSON response', {
			error,
			text,
			res,
			query,
			variables,
			headers,
		});
		throw error;
	}

	if (json.errors) {
		console.error('Failed to parse JSON response without errors', {
			query,
			variables,
			headers,
			errors: json.errors,
		});
		throw json;
	}

	return json.data;
}
