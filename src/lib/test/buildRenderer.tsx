import { QueryClient } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { __mockedRouter } from 'next/router';
import { ComponentType } from 'react';

import renderWithProviders from '~lib/test/renderWithProviders';
import { PartialDeepRecursive } from '~src/types/types';

type RendererOptions<T> = {
	props?: PartialDeepRecursive<T>;
};

export type RendererResult<T> = Omit<RenderResult, 'rerender'> & {
	queryClient: QueryClient;
	rerender: (rerenderProps?: PartialDeepRecursive<T>) => void;
};

export type Renderer<T> = (
	options?: RendererOptions<T>
) => Promise<RendererResult<T>>;

export function buildRenderer<T extends Record<string, any>>(
	Component: ComponentType<T>,
	options: {
		defaultProps?: PartialDeepRecursive<T>;
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
			rerender: (rerenderProps?: PartialDeepRecursive<T>) => {
				const rp = { ...p, ...(rerenderProps || {}) };
				r.rerender(<Component {...rp} />);
			},
		};
	};
}
