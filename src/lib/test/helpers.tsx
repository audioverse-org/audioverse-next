import { ParsedUrlQuery } from 'querystring';

import { render, RenderResult } from '@testing-library/react';
import * as feed from 'feed';
import _ from 'lodash';
import * as router from 'next/router';
import { NextRouter } from 'next/router';
import React, { ComponentType, ReactElement } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import withIntl from '@components/HOCs/withIntl';
import { fetchApi } from '@lib/api';
import { GetPlaylistButtonDataQuery } from '@lib/generated/graphql';

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

export function buildRenderer<
	C extends ComponentType<any>,
	F extends ({ params }: { params: any }) => Promise<{ props: any }>,
	P extends Partial<Parameters<F>[0]['params']>
>(
	Component: C,
	getStaticProps: F,
	defaultParams: P = {} as P
): (params?: Partial<P>) => Promise<RenderResult> {
	return async (params: Partial<P> = {}): Promise<RenderResult> => {
		const p = { ...defaultParams, ...params };
		loadRouter({ query: p });
		const { props } = await getStaticProps({ params: p });
		return renderWithIntl(Component, props);
	};
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
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	const result = await render(
		<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
	);

	return {
		...result,
		queryClient,
	};
}

export function sleep<Payload>({
	ms = 50,
	value = undefined,
}: { ms?: number; value?: Payload | undefined } = {}): Promise<
	Payload | undefined
> {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(value);
		}, ms)
	);
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
