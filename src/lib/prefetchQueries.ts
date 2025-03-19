import { QueryClient } from '@tanstack/react-query';
import pTimeout from 'p-timeout';

import { fns } from '~src/__generated__/prefetch';

import makeQueryClient from './makeQueryClient';

type Key = keyof typeof fns;
type Vars = {
	[K in Key]?: Parameters<(typeof fns)[K]>[0];
};

const options = {
	cacheTime: 24 * 60 * 60 * 1000,
};

async function doPrefetch<T extends Key>(
	k: T,
	v: Vars[T],
	client: QueryClient,
) {
	// WORKAROUND: TypeScript cannot infer the correct parameter type for the union of functions in fns.
	// The type assertion is necessary because each function in fns has its own specific parameter type,
	// and TypeScript cannot narrow down the union type correctly in this context.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = await fns[k](v as any);
	const hasVars = Object.keys(v as Record<string, unknown>).length > 0;

	await client.prefetchQuery({
		queryKey: hasVars ? [k, v] : [k],
		queryFn: () => result,
		...options,
	});

	await client.prefetchInfiniteQuery({
		queryKey: hasVars ? [`${k}.infinite`, v] : [`${k}.infinite`],
		queryFn: () => result,
		initialPageParam: null,
		...options,
	});
}

const doPrefetchQueries = async (
	vars: Vars,
	client: QueryClient,
): Promise<QueryClient> => {
	const keys = Object.keys(vars) as Key[];
	const timeout = 10000;

	await pTimeout(Promise.all(keys.map((k) => doPrefetch(k, vars[k], client))), {
		milliseconds: timeout,
		message: `Prefetch queries timed out after ${timeout}ms`,
	});

	return client;
};

export function prefetchQueries(
	vars: Vars,
	client: QueryClient = makeQueryClient(),
) {
	return doPrefetchQueries(vars, client).catch((e) => {
		console.log('Failed to prefetch queries', e);
		return client;
	});
}
