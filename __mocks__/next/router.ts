import { ParsedUrlQuery } from 'querystring';

import Router_, { NextRouter } from 'next/router';

const Router: typeof Router_ = {
	events: {
		on: jest.fn(),
		off: jest.fn(),
	},
} as any;

function makeRouter(router_: Partial<NextRouter> = {}) {
	return {
		events: {
			on: jest.fn(),
			off: jest.fn(),
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
}

let __mockedRouter = makeRouter();

const __loadRouter = (router_: Partial<NextRouter> = {}) => {
	const val = makeRouter(router_);
	__mockedRouter = val;
	return val;
};

const __loadQuery = (query: ParsedUrlQuery = {}) => {
	__mockedRouter.query = query;
	return __mockedRouter;
};

const useRouter = jest.fn();

beforeEach(() => {
	__loadRouter();
	useRouter.mockImplementation(() => __mockedRouter);
});

export { Router, useRouter, __mockedRouter, __loadRouter, __loadQuery };

export default Router;
