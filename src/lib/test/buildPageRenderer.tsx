import { __mockedRouter } from 'next/router';
import { ComponentType } from 'react';
import { PartialDeep } from 'type-fest';

import { buildRenderer, RendererResult } from './buildRenderer';

type PageRendererOptions<T> = {
	props?: PartialDeep<
		T,
		{
			recurseIntoArrays: true;
		}
	>;
};

export type PageRenderer<T> = (
	options?: PageRendererOptions<T>
) => Promise<RendererResult<T>>;

export function buildPageRenderer<T extends Record<string, unknown>>(
	Page: ComponentType<T>,
	options: {
		getProps: (params: any) => Promise<any>;
	}
): PageRenderer<T> {
	const { getProps } = options;
	const r = buildRenderer(Page);
	return async () => {
		return r({ props: await getProps(__mockedRouter.query) });
	};
}
