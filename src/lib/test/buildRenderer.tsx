import { QueryClient } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { __mockedRouter } from 'next/router';
import React, { ComponentType } from 'react';
import { PartialDeep } from 'type-fest';

import renderWithProviders from '~lib/test/renderWithProviders';

type RendererOptions<T> = {
	props?: PartialDeep<T, { recurseIntoArrays: true }>;
};

export type Renderer<T> = (
	options?: RendererOptions<T>
) => Promise<RenderResult & { queryClient: QueryClient }>;

export function buildRenderer<T>(
	Component: ComponentType<T>,
	options: {
		defaultProps?: PartialDeep<T, { recurseIntoArrays: true }>;
	} = {}
): Renderer<T> {
	const { defaultProps = {} } = options;
	return async ({ props }: RendererOptions<T> = {}): Promise<
		RenderResult & { queryClient: QueryClient }
	> => {
		const p = (props || defaultProps) as any;
		return renderWithProviders(<Component {...p} />);
	};
}
