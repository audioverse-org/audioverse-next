import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import withIntl from '@components/HOCs/withIntl';
import makeQueryClient from '@lib/makeQueryClient';
import { __waitForIntlMessages } from '@lib/useIntlMessages';

export default async function renderWithProviders(
	ui: React.ReactElement,
	renderOptions?: RenderOptions
): Promise<RenderResult & { queryClient: QueryClient }> {
	const queryClient = makeQueryClient();
	const WithIntl = withIntl(() => ui);

	const view = render(
		<QueryClientProvider client={queryClient}>
			<WithIntl />
		</QueryClientProvider>,
		renderOptions
	);

	await __waitForIntlMessages();

	return {
		...view,
		queryClient,
	};
}
