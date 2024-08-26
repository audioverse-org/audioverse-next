import { GetStaticProps } from 'next';
import { ComponentType } from 'react';

import { buildPageRenderer, PageRenderer } from './buildPageRenderer';

export function buildStaticRenderer<T extends Record<string, any>>(
	Component: ComponentType<T>,
	getStaticProps: GetStaticProps<any, any>,
): PageRenderer<T> {
	const getProps = async (p: any) =>
		((await getStaticProps({ params: p })) as any).props;

	return buildPageRenderer(Component, { getProps });
}
