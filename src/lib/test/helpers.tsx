/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParsedUrlQuery } from 'querystring';

import { RenderOptions, RenderResult } from '@testing-library/react';
import { when } from 'jest-when';
import Cookie from 'js-cookie';
import defaultsDeep from 'lodash/defaultsDeep';
import { GetServerSidePropsResult, GetStaticProps } from 'next';
import * as router from 'next/router';
import { NextRouter } from 'next/router';
import React, { ComponentType, ReactElement } from 'react';
import { QueryClient } from 'react-query';
import { PartialDeep } from 'type-fest';

import { fetchApi } from '@lib/api/fetchApi';
import { GetWithAuthGuardDataDocument } from '@lib/generated/graphql';
import renderWithProviders from '@lib/test/renderWithProviders';

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

export function loadAuthGuardData(email: any = 'the_email'): void {
	Cookie.get = jest.fn().mockReturnValue({ avSession: 'abc123' });

	when(mockedFetchApi)
		.calledWith(GetWithAuthGuardDataDocument, expect.anything())
		.mockResolvedValue({
			me: {
				user: {
					email,
				},
			},
		});
}

export function buildLoader<T>(
	document: string,
	defaults: PartialDeep<T>
): (data?: PartialDeep<T>) => T {
	// TODO: Figure out how to set T to actual query return type
	// https://spin.atomicobject.com/2017/03/15/typescript-generate-test-data/
	// https://github.com/willryan/factory.ts/blob/master/src/sync.ts
	// It will already accept the type manually:
	// const loadData = buildLoader<GetHomeStaticPropsQuery>(GetHomeStaticPropsDocument, { .. })
	// should disallow including data in defaults that isn't in type
	return (data: PartialDeep<T> | Record<string, never> = {}) => {
		const value = defaultsDeep(data, defaults);
		when(mockedFetchApi)
			.calledWith(document, expect.anything())
			.mockResolvedValue(value);
		return value;
	};
}

// TODO: Only accept props if getProps not provided
// TODO: Only accept params if getProps provided
type RendererOptions<P> = {
	params?: Partial<P>;
	props?: any; // TODO: restrict to props component actually accepts
	router?: Partial<NextRouter>;
};

type Renderer<P> = (
	options?: RendererOptions<P>
) => Promise<RenderResult & { queryClient: QueryClient }>;

// TODO: Consider how to simplify this function. Perhaps extract a simple
//   version and rename this function to `buildPageRenderer` or similar.
export function buildRenderer<
	C extends ComponentType<any>,
	F extends (params: any) => Promise<any>,
	P extends Partial<Parameters<F>[0]['params']>
>(
	Component: C,
	options: {
		getProps?: F;
		defaultParams?: P;
		defaultProps?: any; // TODO: restrict to props component actually accepts
	} = {}
): Renderer<P> {
	const {
		getProps = undefined,
		// defaultParams = {},
		defaultProps = {},
	} = options;
	return async (
		options: RendererOptions<P> = {}
	): Promise<RenderResult & { queryClient: QueryClient }> => {
		const { params = {}, props } = options;
		const fullParams = { ...params, ...mockedRouter.query };
		const props_ = getProps
			? await getProps(fullParams)
			: props || defaultProps;
		return renderWithIntl(<Component {...props_} />);
	};
}

export function buildStaticRenderer<
	C extends ComponentType<any>,
	F extends GetStaticProps<any, any>,
	P extends Partial<Parameters<F>[0]['params']>
>(Component: C, getStaticProps: F, defaultParams: P = {} as P): Renderer<P> {
	const getProps = async (p: any) =>
		((await getStaticProps({ params: p })) as any).props;

	return buildRenderer(Component, { getProps, defaultParams });
}

export function buildServerRenderer<
	C extends ComponentType<any>,
	F extends (context: any) => Promise<GetServerSidePropsResult<any>>,
	P extends Partial<Parameters<F>[0]['params']>
>(
	Component: C,
	getServerSideProps: F,
	defaultParams: P = {} as P
): Renderer<P> {
	const getProps = async (p: any) => {
		const result = await getServerSideProps({ params: p, query: p } as any);
		if (!('props' in result)) {
			throw new Error('Failed to get server props');
		}
		return result.props;
	};

	return buildRenderer(Component, { getProps, defaultParams });
}

// TODO: Merge with buildRenderer, or just make it private
export async function renderWithIntl(
	ui: ReactElement,
	renderOptions?: RenderOptions
): Promise<RenderResult & { queryClient: QueryClient }> {
	return renderWithProviders(ui, renderOptions);
}

// TODO: Merge with buildRenderer, or just make it private
export async function renderWithQueryProvider(
	ui: ReactElement,
	renderOptions?: RenderOptions
): Promise<RenderResult & { queryClient: QueryClient }> {
	return renderWithProviders(ui, renderOptions);
}

export { default as withMutedReactQueryLogger } from './withMutedReactQueryLogger';
export { default as setPlayerMock } from './setPlayerMock';
