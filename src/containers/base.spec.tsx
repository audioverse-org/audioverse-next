import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { __loadRouter } from 'next/router';
import React from 'react';

import { __awaitIntlMessages } from '~lib/getIntlMessages';
import MyApp from '~pages/_app';

const renderApp = async (component: any, props: any) => {
	const view = render(<MyApp Component={component} pageProps={props} />);

	await __awaitIntlMessages();

	return view;
};

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

		const heads = screen.getAllByTestId('head').map((el) => el.innerHTML);

		expect(heads).toEqual(
			expect.arrayContaining([expect.stringContaining('AudioVerse')]),
		);
	});

	it('rehydrates react-query', async () => {
		const queryClient = new QueryClient();

		await queryClient.prefetchQuery({
			queryKey: ['myQuery'],
			queryFn: async () => 'myResult',
		});

		let initial: any;

		await renderApp(
			() => {
				const { data: myQuery } = useQuery({
					queryKey: ['myQuery'],
				});

				if (initial === undefined) {
					initial = myQuery === undefined ? 'undefined' : myQuery;
				}
			},
			{
				dehydratedState: dehydrate(queryClient),
			},
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

		const heads = screen.getAllByTestId('head').map((el) => el.innerHTML);

		expect(heads).toEqual(
			expect.arrayContaining([
				expect.stringContaining(`the_prop_title | AudioVerse`),
			]),
		);
	});
});
