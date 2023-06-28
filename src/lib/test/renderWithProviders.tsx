import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import withIntl from '~components/HOCs/withIntl';
import { __awaitIntlMessages } from '~lib/getIntlMessages';

import makeQueryClient from '../makeQueryClient';

function withProviders(ui: React.ReactElement, client: QueryClient) {
	const WithIntl = withIntl(() => ui);

	return function WithProviders() {
		return (
			<QueryClientProvider client={client}>
				<WithIntl />
			</QueryClientProvider>
		);
	};
}

export default async function renderWithProviders(
	ui: React.ReactElement,
	renderOptions?: RenderOptions
): Promise<RenderResult & { queryClient: QueryClient }> {
	const queryClient = makeQueryClient();
	const WithProviders = withProviders(ui, queryClient);

	const result = render(<WithProviders />, renderOptions);

	await __awaitIntlMessages();

	return {
		...result,
		queryClient,
		rerender: (rerenderUi: React.ReactElement) => {
			const WithProviders = withProviders(rerenderUi, queryClient);
			result.rerender(<WithProviders />);
		},
	};
}
