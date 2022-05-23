import {
	act,
	render,
	RenderOptions,
	RenderResult,
} from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import withIntl from '@components/HOCs/withIntl';

export default function renderWithProviders(
	ui: React.ReactElement,
	renderOptions?: RenderOptions
): RenderResult & { queryClient: QueryClient } {
	const queryClient = new QueryClient();
	const WithIntl = withIntl(() => ui);

	let result = {} as RenderResult;
	act(() => {
		result = render(
			<QueryClientProvider client={queryClient}>
				<WithIntl />
			</QueryClientProvider>,
			renderOptions
		);
	});

	return {
		...result,
		queryClient,
	};
}
