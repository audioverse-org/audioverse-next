import { act, cleanup, render } from '@testing-library/react';
import { __loadRouter } from 'next/router';
import React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import MyApp from '@pages/_app';

jest.mock('videojs-overlay');

const renderApp = (component: any, props: any) => {
	return render(<MyApp Component={component} pageProps={props} />);
};

jest.mock('next/head');

describe('app', () => {
	beforeEach(() => {
		__loadRouter({
			pathname: '/[language]/discover',
			query: {},
			asPath: '',
		});
	});
	afterEach(cleanup);

	it('sets title', async () => {
		await act(async () => {
			const { getByTestId } = await render(
				<MyApp
					Component={(() => null) as unknown as typeof React.Component}
					pageProps={{}}
				/>
			);

			const head = getByTestId('head');

			expect(head.innerHTML).toContain('AudioVerse');
		});
	});

	it('rehydrates react-query', async () => {
		await act(async () => {
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
	});

	it('includes sidebar', async () => {
		await act(async () => {
			const { getByText } = await renderApp(() => <>h</>, {});

			expect(getByText('More')).toBeInTheDocument();
		});
	});

	it('disables sidebar', async () => {
		await act(async () => {
			const { queryByText } = await renderApp(() => <>h</>, {
				disableSidebar: true,
			});

			expect(queryByText('More')).not.toBeInTheDocument();
		});
	});

	it('sets title with props', async () => {
		await act(async () => {
			const { getByTestId } = await renderApp(() => <>h</>, {
				title: 'the_prop_title',
			});

			const head = getByTestId('head');

			expect(head.innerHTML).toContain('the_prop_title | AudioVerse');
		});
	});
});
