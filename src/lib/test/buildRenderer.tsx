import { act, RenderResult } from '@testing-library/react';
import { NextRouter } from 'next/router';
import React, { ComponentType } from 'react';
import { QueryClient } from 'react-query';

import renderWithProviders from '@lib/test/renderWithProviders';

import { _mockedRouter } from '../../__mocks__/next/router';

// TODO: Only accept props if getProps not provided
// TODO: Only accept params if getProps provided
type RendererOptions<P> = {
	params?: Partial<P>;
	props?: any; // TODO: restrict to props component actually accepts
	router?: Partial<NextRouter>;
};

// TODO: Consider how to simplify this function. Perhaps extract a simple
//   version and rename this function to `buildPageRenderer` or similar.
export function buildRenderer<
	C extends ComponentType<any>,
	F extends (params: any) => Promise<any>,
	P extends Partial<Parameters<F>[0]['params']>
>(
	Component: C,
	options: {
		getProps?: F;
		defaultParams?: P;
		defaultProps?: any; // TODO: restrict to props component actually accepts
	} = {}
): Renderer<P> {
	const {
		getProps = undefined,
		// defaultParams = {},
		defaultProps = {},
	} = options;
	return async (
		options: RendererOptions<P> = {}
	): Promise<RenderResult & { queryClient: QueryClient }> => {
		let result;
		await act(async () => {
			const { params = {}, props } = options;
			const fullParams = { ...params, ..._mockedRouter.query };
			const props_ = getProps
				? await getProps(fullParams)
				: props || defaultProps;
			result = renderWithProviders(<Component {...props_} />, undefined);
		});
		return result as unknown as Promise<
			RenderResult & { queryClient: QueryClient }
		>;
	};
}
