import { getCurrentRequest } from '~lib/api/storeRequest';
import { getSessionToken } from '~lib/cookies';
import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'https://graphql-staging.audioverse.org/graphql';

const getResponse = (
	headers: HeadersInit,
	query: string,
	variables: unknown,
): Promise<Response> => {
	const body = JSON.stringify({
		query,
		variables,
	});

	return fetch(API_URL, {
		method: 'POST',
		headers,
		body,
	});
};

const fetchJson = manageAsyncFunction(
	async ({
		headers,
		query,
		variables,
	}: {
		headers: HeadersInit;
		query: string;
		variables: unknown;
	}) => {
		const res = await getResponse(headers, query, variables);

		if (!res.ok) {
			throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);
		}

		const json = await res.json();

		if (json.errors) {
			throw new Error(JSON.stringify(json));
		}

		return json.data;
	},
);

export async function fetchApi<TData>(
	query: string,
	{ variables = {} } = {},
): Promise<TData> {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	const sessionToken = getSessionToken(getCurrentRequest());

	if (sessionToken) {
		headers['x-av-session'] = sessionToken;
	}

	return fetchJson({ headers, query, variables });
}
