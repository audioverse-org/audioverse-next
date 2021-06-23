import { ParsedUrlQuery } from 'querystring';

import { render, RenderResult } from '@testing-library/react';
import * as feed from 'feed';
import { when } from 'jest-when';
import _ from 'lodash';
import { GetServerSidePropsResult } from 'next';
import * as router from 'next/router';
import { NextRouter } from 'next/router';
import React, { ComponentType, ReactElement } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { PartialDeep } from 'type-fest';
import videojs from 'video.js';

import withIntl from '@components/HOCs/withIntl';
import { fetchApi } from '@lib/api';
import {
	GetPlaylistButtonDataQuery,
	GetWithAuthGuardDataDocument,
} from '@lib/generated/graphql';
import { sleep } from '@lib/sleep';

export const mockedFetchApi = fetchApi as jest.Mock;

// TODO: Delete this and mock @lib/writeFeedFile instead, except in writeFeedFile.spec.ts
export const mockFeed = (): { addItem: any; rss2: any } => {
	const addItem = jest.fn();
	const rss2 = jest.fn();
	jest.spyOn(feed, 'Feed').mockImplementation(() => ({ addItem, rss2 } as any));

	return { addItem, rss2 };
};

export function loadQuery(query: ParsedUrlQuery = {}): void {
	loadRouter({ query });
}

export function loadRouter(router_: Partial<NextRouter>): void {
	jest.spyOn(router, 'useRouter').mockReturnValue(router_ as any);
}

export function loadAuthGuardData(email: any = 'the_email'): void {
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
		const value = _.defaultsDeep(data, defaults);
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

type Renderer<P> = (options?: RendererOptions<P>) => Promise<RenderResult>;

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
		defaultParams = {},
		defaultProps = {},
	} = options;
	return async (options: RendererOptions<P> = {}): Promise<RenderResult> => {
		const { params = {}, props, router = {} } = options;
		const fullParams = { ...defaultParams, ...params };
		const props_ = getProps
			? await getProps(fullParams)
			: props || defaultProps;
		loadRouter({ query: fullParams, ...router });
		return renderWithIntl(Component, props_);
	};
}

export function buildStaticRenderer<
	C extends ComponentType<any>,
	F extends ({ params }: { params: any }) => Promise<{ props: any }>,
	P extends Partial<Parameters<F>[0]['params']>
>(Component: C, getStaticProps: F, defaultParams: P = {} as P): Renderer<P> {
	const getProps = async (p: any) =>
		(await getStaticProps({ params: p })).props;

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
export async function renderWithIntl<T>(
	Component: React.ComponentType<T>,
	props: T
): Promise<RenderResult> {
	const WithIntl = withIntl(Component);

	return renderWithQueryProvider(<WithIntl {...props} />);
}

// TODO: Merge with buildRenderer, or just make it private
export async function renderWithQueryProvider(
	ui: ReactElement
): Promise<RenderResult & { queryClient: QueryClient }> {
	const queryClient = new QueryClient();
	const result = await render(
		<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
	);

	return {
		...result,
		queryClient,
	};
}

export function resolveWithDelay(
	mock: jest.SpyInstance,
	ms = 50,
	value: any = undefined
): void {
	mock.mockImplementation(() => sleep({ ms, value }));
}

export async function withMutedReactQueryLogger(
	func: () => Promise<any>
): Promise<any> {
	const noop = () => {
		// do nothing
	};

	setLogger({
		log: noop,
		warn: noop,
		error: noop,
	});

	const result = await func();

	setLogger(window.console);

	return result;
}

export const makePlaylistButtonData = (
	playlists: any[] | undefined = undefined
): GetPlaylistButtonDataQuery => {
	const value = playlists || [
		{
			id: 'playlist_id',
			title: 'playlist_title',
		},
	];

	return _.set({} as any, 'me.user.playlists.nodes', value);
};

interface SetPlayerMockOptions {
	isPaused?: boolean;
	time?: number;
	duration?: number;
	functions?: Partial<videojs.Player>;
}

export const mockVideojs = (videojs as unknown) as jest.Mock;

export function setPlayerMock(
	options: SetPlayerMockOptions = {}
): videojs.Player {
	let { isPaused = true, time = 50 } = options;
	const { duration = 100, functions = {} } = options;

	const mockPlayer: Partial<videojs.Player> = {
		play: jest.fn(async () => {
			isPaused = false;
		}),
		pause: jest.fn(() => {
			isPaused = true;
			return mockPlayer as videojs.Player;
		}),
		paused: jest.fn(() => isPaused),
		currentTime: jest.fn((newTime: number | null = null) => {
			if (newTime !== null) time = newTime;
			return time;
		}),
		duration: jest.fn(() => duration),
		src: jest.fn(),
		...functions,
	};

	mockVideojs.mockReturnValue(mockPlayer);

	return mockPlayer as videojs.Player;
}
