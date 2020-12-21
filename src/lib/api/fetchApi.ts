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

	const json = await res.json();
	if (json.errors) {
		console.error({
			query,
			variables,
			headers,
			errors: json.errors,
		});
		throw new Error('Failed to fetch API');
	}
	return json.data;
}
