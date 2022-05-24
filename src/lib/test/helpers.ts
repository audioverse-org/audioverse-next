/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParsedUrlQuery } from 'querystring';

import * as router from 'next/router';
import { NextRouter } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';

export const mockedFetchApi = fetchApi as jest.Mock;

export let mockedRouter: NextRouter;

export function loadQuery(query: ParsedUrlQuery = {}): void {
	loadRouter({ query });
}

export function loadRouter(router_: Partial<NextRouter> = {}): NextRouter {
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

	jest.spyOn(router, 'useRouter').mockReturnValue(val as any);
	mockedRouter = val;

	return val;
}

export { default as withMutedReactQueryLogger } from './withMutedReactQueryLogger';
export { default as setPlayerMock } from './setPlayerMock';
export { buildRenderer } from './buildRenderer';
export { buildStaticRenderer } from './buildStaticRenderer';
