import { IncomingMessage } from 'http';

import getCookies from '@lib/getCookies';

const API_URL = 'https://graphql-staging.audioverse.org/graphql';

let _request: IncomingMessage | null = null;

export function storeRequest(request: IncomingMessage): void {
	_request = request;
}

export async function fetchApi(
	query: string,
	{ variables = {} } = {}
): Promise<any> {
	const cookies = getCookies(_request);

	const headers = {
		'Content-Type': 'application/json',
		'x-av-session': cookies?.avSession,
	};

	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const text = await res.text();

	if (!res.ok) {
		console.error({ text, res, query, variables, headers });
		throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);
	}

	let json;

	try {
		json = JSON.parse(text);
	} catch (error) {
		console.error({ error, text, res, query, variables, headers });
		throw error;
	}

	if (json.errors) {
		console.error({
			query,
			variables,
			headers,
			errors: json.errors,
		});
		throw new Error('API encountered errors');
	}

	return json.data;
}

export function graphqlFetcher<TData, TVariables>(
	query: string,
	variables: TVariables
): () => Promise<TData> {
	return () => fetchApi(query, { variables });
}
