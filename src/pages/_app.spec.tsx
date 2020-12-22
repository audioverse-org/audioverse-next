import { render } from '@testing-library/react';
import React from 'react';
import { QueryCache, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import MyApp from '@pages/_app';

const renderApp = (component: any, props: any) => {
	return render(<MyApp Component={component} pageProps={props} />);
};

describe('app', () => {
	it('sets title', async () => {
		const { getByTestId } = await render(
			<MyApp
				Component={((() => null) as unknown) as typeof React.Component}
				pageProps={{}}
			/>
		);

		const head = getByTestId('head');

		expect(head.innerHTML).toContain('AudioVerse');
	});

	it('rehydrates react-query', async () => {
		const queryCache = new QueryCache();

		await queryCache.prefetchQuery('myQuery', async () => 'myResult');

		const spy = jest.fn();

		const { getByText } = await renderApp(
			() => {
				const { data: myQuery } = useQuery('myQuery', spy);
				return <>{myQuery}</>;
			},
			{
				dehydratedState: dehydrate(queryCache),
			}
		);

		expect(getByText('myResult')).toBeInTheDocument();
	});
});
