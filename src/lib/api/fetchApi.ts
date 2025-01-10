import pMemoize from 'p-memoize';
import pThrottle from 'p-throttle';
import pTimeout from 'p-timeout';

import { getCurrentRequest } from '~lib/api/storeRequest';
import { getSessionToken } from '~lib/cookies';

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'https://graphql-staging.audioverse.org/graphql';

const throttle = pThrottle({ limit: 10, interval: 1000 });

const getResponse = throttle(
	async (headers: HeadersInit, query: string, variables: unknown) => {
		return pTimeout(
			fetch(API_URL, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query,
					variables,
				}),
			}),
			{
				milliseconds: 5000,
			},
		);
	},
);

const fetchJson = pMemoize(
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

	try {
		return fetchJson({ headers, query, variables });
	} catch (previousError) {
		const e = new Error('Error fetching from API');
		Object.assign(e, { query, variables, previousError });
		throw e;
	}
}
