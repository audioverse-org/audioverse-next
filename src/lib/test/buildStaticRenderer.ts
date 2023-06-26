import { GetStaticProps } from 'next';
import { ComponentType } from 'react';

import { Renderer } from '~lib/test/buildRenderer';

import { buildPageRenderer } from './buildPageRenderer';

export function buildStaticRenderer<T extends Record<string, any>>(
	Component: ComponentType<T>,
	getStaticProps: GetStaticProps<any, any>
): Renderer<T> {
	const getProps = async (p: any) =>
		((await getStaticProps({ params: p })) as any).props;

	return buildPageRenderer(Component, { getProps });
}
