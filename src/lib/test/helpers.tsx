import { ParsedUrlQuery } from 'querystring';

import { render, RenderResult } from '@testing-library/react';
import * as feed from 'feed';
import * as router from 'next/router';
import { NextRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import withIntl from '@components/HOCs/withIntl';
import * as api from '@lib/api';
import * as graphql from '@lib/generated/graphql';
import type { Playlist, Sermon, Testimony } from 'types';

export const mockFeed = (): { addItem: any; rss2: any } => {
	const addItem = jest.fn();
	const rss2 = jest.fn();
	jest.spyOn(feed, 'Feed').mockImplementation(() => ({ addItem, rss2 } as any));

	return { addItem, rss2 };
};

export function loadMe({
	playlists = [],
}: { playlists?: Partial<Playlist>[] } = {}): void {
	jest.spyOn(api, 'getMe').mockResolvedValue({
		playlists: {
			nodes: playlists,
		},
	} as any);
}

export function loadSermons({
	nodes = undefined,
	count = undefined,
}: { nodes?: any[]; count?: number } = {}): void {
	jest.spyOn(api, 'getSermons').mockReturnValue(
		Promise.resolve({
			nodes: nodes || [
				{
					id: '1',
					title: 'the_sermon_title',
					videoFiles: [],
				},
			],
			aggregate: {
				count: count || 1,
			},
		})
	);
}

export function loadSermon(sermon: any = undefined): void {
	const data = sermon || {
		id: '1',
		title: 'the_sermon_title',
		persons: [],
		audioFiles: [],
		videoFiles: [],
	};

	jest.spyOn(api, 'getSermon').mockResolvedValue((data as any) as Sermon);
}

export function setSermonCount(count: number): void {
	jest.spyOn(api, 'getSermonCount').mockResolvedValue(count);
}

export function loadTestimonies(nodes: Testimony[] | null = null): void {
	jest.spyOn(graphql, 'getTestimonies').mockResolvedValue({
		testimonies: {
			nodes: nodes || [
				{
					author: 'the_testimony_author',
					body: 'the_testimony_body',
					writtenDate: 'the_testimony_date',
				},
			],
			aggregate: {
				count: 1,
			},
		},
	});
}

export function loadQuery(query: ParsedUrlQuery = {}): void {
	loadRouter({ query });
}

export function loadRouter(router_: Partial<NextRouter>): void {
	jest.spyOn(router, 'useRouter').mockReturnValue(router_ as any);
}

export async function renderWithIntl<T>(
	Component: React.ComponentType<T>,
	props: T
): Promise<RenderResult> {
	const WithIntl = withIntl(Component);

	return renderWithQueryProvider(<WithIntl {...props} />);
}

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
