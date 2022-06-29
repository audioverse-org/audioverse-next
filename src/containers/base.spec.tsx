import { render, screen } from '@testing-library/react';
import { __loadRouter } from 'next/router';
import React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import MyApp from '@pages/_app';
import defaultsDeep from 'lodash/defaultsDeep';
import { __waitForIntlMessages } from '@lib/useIntlMessages';

jest.mock('@components/molecules/helpWidget');
jest.mock('@components/molecules/loadingIndicator');

const renderComponent = async (
	props: Partial<Parameters<typeof MyApp>[0]> = {}
) => {
	const p = defaultsDeep(props, {
		Component: () => <>hello world</>,
		pageProps: {},
	});

	const view = render(<MyApp {...p} />);

	await __waitForIntlMessages();

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
		await renderComponent();

		await screen.findByText('hello world');

		const heads = screen.getAllByTestId('head').map((el) => el.innerHTML);

		expect(heads).toEqual(
			expect.arrayContaining([expect.stringContaining('AudioVerse')])
		);
	});

	it('rehydrates react-query', async () => {
		const queryClient = new QueryClient();

		await queryClient.prefetchQuery('myQuery', async () => 'myResult');

		const spy = jest.fn();

		await renderComponent({
			Component: () => {
				const { data: myQuery } = useQuery('myQuery', spy);
				return <>{myQuery}</>;
			},
			pageProps: {
				dehydratedState: dehydrate(queryClient),
			},
		});

		await expect(screen.findByText('myResult')).resolves.toBeInTheDocument();
	});

	it('includes sidebar', async () => {
		await renderComponent({
			Component: () => <>h</>,
			pageProps: {},
		});

		await screen.findByText('h');

		expect(screen.getByText('More')).toBeInTheDocument();
	});

	it('disables sidebar', async () => {
		await renderComponent({
			Component: () => <>h</>,
			pageProps: {
				disableSidebar: true,
			},
		});

		await screen.findByText('h');

		expect(screen.queryByText('More')).not.toBeInTheDocument();
	});

	it('sets title with props', async () => {
		await renderComponent({
			Component: () => {
				return <>h</>;
			},
			pageProps: {
				title: 'the_prop_title',
			},
		});

		await screen.findByText('h');

		const heads = screen.getAllByTestId('head').map((el) => el.innerHTML);

		expect(heads).toEqual(
			expect.arrayContaining([
				expect.stringContaining(`the_prop_title | AudioVerse`),
			])
		);
	});
});
