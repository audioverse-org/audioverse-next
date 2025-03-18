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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const r = await fns[k](v as any);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const hasVars = Object.keys(v as any).length > 0;
	const queryKey = hasVars ? [k, v] : [k];
	const infiniteQueryKey = hasVars ? [`${k}.infinite`, v] : [`${k}.infinite`];

	await client.prefetchQuery({
		queryKey,
		queryFn: () => r,
		...options,
	});

	await client.prefetchInfiniteQuery({
		queryKey: infiniteQueryKey,
		queryFn: () => r,
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
