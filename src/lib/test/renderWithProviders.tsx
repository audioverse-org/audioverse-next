import {
	act,
	render,
	RenderOptions,
	RenderResult,
} from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import withIntl from '@/components/HOCs/withIntl';
import getIntlMessages from '@/lib/getIntlMessages';
import { vi } from 'vitest';

export default async function renderWithProviders(
	ui: React.ReactElement,
	renderOptions?: RenderOptions
): Promise<RenderResult & { queryClient: QueryClient }> {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	const WithIntl = withIntl(() => ui);

	const result = render(
		<QueryClientProvider client={queryClient}>
			<WithIntl />
		</QueryClientProvider>,
		renderOptions
	);

	await act(async () => {
		await vi.mocked(getIntlMessages).mock.results[0]?.value;
	});

	return {
		...result,
		queryClient,
	};
}
