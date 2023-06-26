import { QueryClient } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { __mockedRouter } from 'next/router';
import React, { ComponentType } from 'react';
import { PartialDeep } from 'type-fest';

import renderWithProviders from '~lib/test/renderWithProviders';

type RendererOptions<T> = {
	props?: PartialDeep<T, { recurseIntoArrays: true }>;
};

export type RendererResult<T> = Omit<RenderResult, 'rerender'> & {
	queryClient: QueryClient;
	rerender: (
		rerenderProps?: PartialDeep<T, { recurseIntoArrays: true }>
	) => void;
};

export type Renderer<T> = (
	options?: RendererOptions<T>
) => Promise<RendererResult<T>>;

export function buildRenderer<T extends Record<string, any>>(
	Component: ComponentType<T>,
	options: {
		defaultProps?: PartialDeep<T, { recurseIntoArrays: true }>;
	} = {}
): Renderer<T> {
	const { defaultProps = {} } = options;
	return async ({ props }: RendererOptions<T> = {}): Promise<
		RendererResult<T>
	> => {
		const p = (props || defaultProps) as any;
		const r = await renderWithProviders(<Component {...p} />);
		return {
			...r,
			rerender: (
				rerenderProps?: PartialDeep<T, { recurseIntoArrays: true }>
			) => {
				const rp = { ...p, ...(rerenderProps || {}) };
				return r.rerender(<Component {...rp} />);
			},
		};
	};
}
