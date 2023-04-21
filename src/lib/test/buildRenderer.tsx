import { RenderResult } from '@testing-library/react';
import { __mockedRouter, NextRouter } from 'next/router';
import React, { ComponentType } from 'react';
import { QueryClient } from 'react-query';

import renderWithProviders from '~lib/test/renderWithProviders';

// TODO: Only accept props if getProps not provided
// TODO: Only accept params if getProps provided
type RendererOptions = {
	props?: any; // TODO: restrict to props component actually accepts
	router?: Partial<NextRouter>;
};

export type Renderer = (
	options?: RendererOptions
) => Promise<RenderResult & { queryClient: QueryClient }>;

// TODO: Consider how to simplify this function. Perhaps extract a simple
//   version and rename this function to `buildPageRenderer` or similar.
export function buildRenderer<
	C extends ComponentType<any>,
	F extends (params: any) => Promise<any>
>(
	Component: C,
	options: {
		getProps?: F;
		defaultProps?: any; // TODO: restrict to props component actually accepts
	} = {}
): Renderer {
	const { getProps = undefined, defaultProps = {} } = options;
	return async (
		options: RendererOptions = {}
	): Promise<RenderResult & { queryClient: QueryClient }> => {
		const { props } = options;
		const props_ = getProps
			? await getProps(__mockedRouter.query)
			: props || defaultProps;

		const result = renderWithProviders(<Component {...props_} />, undefined);

		return result as unknown as Promise<
			RenderResult & { queryClient: QueryClient }
		>;
	};
}
