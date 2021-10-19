import { parse } from 'graphql';
import { print } from 'graphql/language/printer';

import { getCurrentRequest } from '@lib/api/storeRequest';
import { IS_PRODUCTION_DEPLOYMENT } from '@lib/constants';
import { getSessionToken } from '@lib/cookies';
import { sleep } from '@lib/sleep';

const API_URL = IS_PRODUCTION_DEPLOYMENT
	? 'https://graphql.audioverse.org/graphql'
	: 'https://graphql-staging.audioverse.org/graphql';

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

export async function fetchApi(
	query: string,
	{ variables = {} } = {}
): Promise<any> {
	query = removeDuplicateFragments(query);

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
