import { getCurrentRequest } from '~lib/api/storeRequest';
import { getSessionToken } from '~lib/cookies';
import { manageAsyncFunction } from '~src/lib/manageAsyncFunction';

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'https://graphql-staging.audioverse.org/graphql';

const getResponse = async (
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

const wrappedGetResponse = manageAsyncFunction(getResponse);

const fetchJson = async ({
	headers,
	query,
	variables,
}: {
	headers: HeadersInit;
	query: string;
	variables: unknown;
}) => {
	const res = await wrappedGetResponse(headers, query, variables);

	if (!res.ok) {
		console.error({ text: await res.text(), res, query, variables, headers });
		throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);
	}

	const json = await res.json();

	if (json.errors) {
		console.error({
			query,
			variables,
			headers,
			errors: json.errors,
		});
		throw json;
	}

	return json.data;
};

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

	try {
		return fetchJson({ headers, query, variables });
	} catch (previousError) {
		const e = new Error('Error fetching from API');
		Object.assign(e, { query, variables, previousError });
		throw e;
	}
}
