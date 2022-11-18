import { render, screen } from '@testing-library/react';
import { __loadRouter } from 'next/router';
import React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import MyApp from '@pages/_app';

const renderApp = (component: any, props: any) => {
	return render(<MyApp Component={component} pageProps={props} />);
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
		await render(
			<MyApp
				Component={(() => null) as unknown as typeof React.Component}
				pageProps={{}}
			/>
		);

		const heads = screen.getAllByTestId('head').map((el) => el.innerHTML);

		expect(heads).toEqual(
			expect.arrayContaining([expect.stringContaining('AudioVerse')])
		);
	});

	it('rehydrates react-query', async () => {
		const queryClient = new QueryClient();

		await queryClient.prefetchQuery('myQuery', async () => 'myResult');

		const spy = jest.fn();

		const { getByText } = await renderApp(
			() => {
				const { data: myQuery } = useQuery('myQuery', spy);
				return <>{myQuery}</>;
			},
			{
				dehydratedState: dehydrate(queryClient),
			}
		);

		expect(getByText('myResult')).toBeInTheDocument();
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
			])
		);
	});
});
