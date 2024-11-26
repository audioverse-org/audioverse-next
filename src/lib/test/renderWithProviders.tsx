import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
	act,
	render,
	RenderOptions,
	RenderResult,
} from '@testing-library/react';
import React, { ReactNode } from 'react';

import AndIntl from '~src/components/templates/andIntl';

import getIntlMessages from '../getIntlMessages';
import makeQueryClient from '../makeQueryClient';

function withProviders(ui: ReactNode, client: QueryClient) {
	return function WithProviders() {
		return (
			<QueryClientProvider client={client}>
				<AndIntl>{ui}</AndIntl>
			</QueryClientProvider>
		);
	};
}

export default async function renderWithProviders(
	ui: React.ReactElement,
	renderOptions?: RenderOptions,
): Promise<RenderResult & { queryClient: QueryClient }> {
	const queryClient = makeQueryClient();
	const WithProviders = withProviders(ui, queryClient);

	const result = render(<WithProviders />, renderOptions);

	await act(async () => {
		await jest.mocked(getIntlMessages).mock.results[0]?.value;
	});

	return {
		...result,
		queryClient,
		rerender: (rerenderUi: ReactNode) => {
			const WithProviders = withProviders(rerenderUi, queryClient);
			result.rerender(<WithProviders />);
		},
	};
}
