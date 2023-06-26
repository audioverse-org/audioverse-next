import { QueryClient } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { __mockedRouter } from 'next/router';
import { ComponentType } from 'react';

import { buildRenderer } from './buildRenderer';

// TODO: Only accept props if getProps not provided
// TODO: Only accept params if getProps provided
type PageRendererOptions = {
	props?: any; // TODO: restrict to props component actually accepts
};

export type PageRenderer = (
	options?: PageRendererOptions
) => Promise<RenderResult & { queryClient: QueryClient }>;

export function buildPageRenderer<
	C extends ComponentType<any>,
	F extends (params: any) => Promise<any>
>(
	Page: C,
	options: {
		getProps: F;
	}
): PageRenderer {
	const { getProps } = options;
	const r = buildRenderer(Page);
	return async (): Promise<RenderResult & { queryClient: QueryClient }> => {
		return r({ props: await getProps(__mockedRouter.query) });
	};
}
