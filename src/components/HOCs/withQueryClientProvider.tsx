import { QueryClientProvider } from 'react-query';
import React, { ReactElement } from 'react';
import makeQueryClient from '@lib/makeQueryClient';

const queryClient = makeQueryClient();

type ComponentType<P extends Record<string, unknown>> = (
	props: P
) => ReactElement;

const withQueryClientProvider = <P extends Record<string, unknown>>(
	WrappedComponent: ComponentType<P>
): ComponentType<P> => {
	return function WithQueryClientProvider(props: P) {
		return (
			<QueryClientProvider client={queryClient}>
				<WrappedComponent {...props} />
			</QueryClientProvider>
		);
	};
};

export default withQueryClientProvider;
