import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React from 'react';

import withIntl from '~components/HOCs/withIntl';
import { __awaitIntlMessages } from '~lib/getIntlMessages';

import makeQueryClient from '../makeQueryClient';

export default async function renderWithProviders(
	ui: React.ReactElement,
	renderOptions?: RenderOptions
): Promise<RenderResult & { queryClient: QueryClient }> {
	const queryClient = makeQueryClient();
	const WithIntl = withIntl(() => ui);

	const result = render(
		<QueryClientProvider client={queryClient}>
			<WithIntl />
		</QueryClientProvider>,
		renderOptions
	);

	await __awaitIntlMessages();

	return {
		...result,
		queryClient,
	};
}
