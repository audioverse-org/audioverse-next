import { IncomingMessage } from 'http';

import { parse } from 'graphql';
import { print } from 'graphql/language/printer';

import getCookies from '@lib/getCookies';

const API_URL = 'https://graphql-staging.audioverse.org/graphql';

let _request: IncomingMessage | null = null;

export function storeRequest(request: IncomingMessage): void {
	_request = request;
}

// WORKAROUND
// Graphql Code Generator duplicates fragment definitions
// for fragments that get referenced multiple times.
// https://github.com/dotansimha/graphql-code-generator/issues/3063
const removeDuplicateFragments = (query: string): string => {
	const ast = parse(query);

	const seen: string[] = [];

	const newDefinitions = ast.definitions.filter((def) => {
		if (def.kind !== 'FragmentDefinition') {
			return true;
		}

		const id = `${def.name.value}-${def.typeCondition.name.value}`;
		const haveSeen = seen.includes(id);

		seen.push(id);

		return !haveSeen;
	});

	const newAst = {
		...ast,
		definitions: newDefinitions,
	};

	return print(newAst);
};

export async function fetchApi(
	query: string,
	{ variables = {} } = {}
): Promise<any> {
	const cookies = getCookies(_request);

	query = removeDuplicateFragments(query);

	// TODO: Improve type
	const headers: any = {
		'Content-Type': 'application/json',
	};

	if (cookies.avSession) {
		headers['x-av-session'] = cookies.avSession;
	}

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
	variables: TVariables | undefined
): () => Promise<TData> {
	return () => fetchApi(query, { variables });
}
