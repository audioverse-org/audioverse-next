import { act, render, screen } from '@testing-library/react';
import { __loadRouter } from 'next/router';
import React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import MyApp from '@/pages/_app';
import getIntlMessages from '@/lib/getIntlMessages';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const renderApp = async (component: any, props: any) => {
	const view = render(<MyApp Component={component} pageProps={props} />);

	await act(async () => {
		await vi.mocked(getIntlMessages).mock.results[0]?.value;
	});

	return view;
};

const getHeads = async () =>
	(await screen.findAllByTestId('head')).map((el) => el.innerHTML);

describe('app', () => {
	beforeEach(() => {
		__loadRouter({
			pathname: '/[language]/discover',
			query: {},
			asPath: '',
		});
	});

	it('sets title', async () => {
		await renderApp(() => null, {});

		const heads = await getHeads();

		expect(heads).toEqual(
			expect.arrayContaining([expect.stringContaining('AudioVerse')])
		);
	});

	it('rehydrates react-query', async () => {
		const queryClient = new QueryClient();

		await queryClient.prefetchQuery('myQuery', async () => 'myResult');

		let initial: any;

		await renderApp(
			() => {
				const { data: myQuery } = useQuery('myQuery', vi.fn());

				if (initial === undefined) {
					initial = myQuery === undefined ? 'undefined' : myQuery;
				}
			},
			{
				dehydratedState: dehydrate(queryClient),
			}
		);

		expect(initial).toEqual('myResult');
	});

	it('includes sidebar', async () => {
		const { getByText } = await renderApp(() => <>h</>, {});

		expect(getByText('More')).toBeInTheDocument();
	});

	it('disables sidebar', async () => {
		const { queryByText } = await renderApp(() => <>h</>, {
			disableSidebar: true,
		});

		expect(queryByText('More')).not.toBeInTheDocument();
	});

	it('sets title with props', async () => {
		await renderApp(() => <>h</>, {
			title: 'the_prop_title',
		});

		const heads = await getHeads();

		expect(heads).toEqual(
			expect.arrayContaining([
				expect.stringContaining(`the_prop_title | AudioVerse`),
			])
		);
	});
});
