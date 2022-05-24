import { ParsedUrlQuery } from 'querystring';

import { NextRouter } from 'next/router';

export let _mockedRouter: NextRouter;

export function _loadQuery(query: ParsedUrlQuery = {}): void {
	_loadRouter({ query });
}

export function _loadRouter(router_: Partial<NextRouter> = {}): NextRouter {
	const val = {
		events: {
			on: jest.fn(),
		},
		push: jest.fn().mockResolvedValue(true),
		prefetch: async () => undefined,
		route: '/',
		pathname: '/',
		query: {},
		asPath: '/',
		basePath: '/',
		isLocaleDomain: false,
		...router_,
	} as NextRouter;

	_mockedRouter = val;

	return val;
}

export const useRouter = jest.fn(() => _mockedRouter);
