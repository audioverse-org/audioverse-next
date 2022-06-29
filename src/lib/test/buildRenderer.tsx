import { RenderResult } from '@testing-library/react';
import { __mockedRouter } from 'next/router';
import React, { ComponentType } from 'react';
import { QueryClient } from 'react-query';

import renderWithProviders from '@lib/test/renderWithProviders';
import { PartialDeep } from 'type-fest';
import { ParsedUrlQuery } from 'querystring';

type RendererOptions<P> = {
	props?: PartialDeep<P>;
};

type RendererResult = RenderResult & { queryClient: QueryClient };

export type Renderer<P> = (
	options?: RendererOptions<P>
) => Promise<RendererResult>;

type BuildRendererOptions<P> = {
	getProps?: (query: ParsedUrlQuery) => Promise<PartialProps<P>>;
	defaultProps?: PartialDeep<P>;
};

type PartialProps<P> = Partial<P> | PartialDeep<P>;

async function findProps<P>(
	props: PartialProps<P> | undefined,
	options: BuildRendererOptions<P> = {}
): Promise<PartialProps<P>> {
	const { getProps, defaultProps } = options;
	if (props) {
		return Promise.resolve(props);
	}
	if (getProps) {
		return await getProps(__mockedRouter.query);
	}
	return Promise.resolve(defaultProps || {});
}

export function buildRenderer<P>(
	Component: ComponentType<P>,
	options: BuildRendererOptions<P> = {}
): Renderer<P> {
	return async function renderComponent({
		props,
	}: RendererOptions<P> = {}): Promise<RendererResult> {
		const p = await findProps(props, options);
		return renderWithProviders(<Component {...(p as any)} />);
	};
}
