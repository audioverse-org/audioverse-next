import { GetStaticProps } from 'next';
import { ComponentType } from 'react';

import { buildRenderer, Renderer } from '@/lib/test/buildRenderer';

export function buildStaticRenderer<
	C extends ComponentType<any>,
	F extends GetStaticProps<any, any>
>(Component: C, getStaticProps: F): Renderer {
	const getProps = async (p: any) =>
		((await getStaticProps({ params: p })) as any).props;

	return buildRenderer(Component, { getProps });
}
