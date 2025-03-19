import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
	act,
	renderHook,
	RenderHookResult,
	RenderOptions,
} from '@testing-library/react';
import React, { ReactNode } from 'react';

import AndIntl from '~src/components/templates/andIntl';

import getIntlMessages from '../getIntlMessages';
import makeQueryClient from '../makeQueryClient';

function withProviders(client: QueryClient) {
	return function WithProviders({ children }: { children: ReactNode }) {
		return (
			<QueryClientProvider client={client}>
				<AndIntl>{children}</AndIntl>
			</QueryClientProvider>
		);
	};
}

export default async function renderHookWithProviders<T, R>(
	hook: (props: T) => R,
	renderOptions?: RenderOptions,
): Promise<RenderHookResult<R, T> & { queryClient: QueryClient }> {
	const queryClient = makeQueryClient();
	const WithProviders = withProviders(queryClient);

	const result = renderHook(hook, {
		wrapper: WithProviders,
		...renderOptions,
	});

	await act(async () => {
		await jest.mocked(getIntlMessages).mock.results[0]?.value;
	});

	return {
		...result,
		queryClient,
	};
}
