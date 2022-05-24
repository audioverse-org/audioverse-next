import { GetStaticProps } from 'next';
import { ComponentType } from 'react';

import { buildRenderer } from '@lib/test/buildRenderer';

export function buildStaticRenderer<
	C extends ComponentType<any>,
	F extends GetStaticProps<any, any>,
	P extends Partial<Parameters<F>[0]['params']>
>(Component: C, getStaticProps: F, defaultParams: P = {} as P): Renderer<P> {
	const getProps = async (p: any) =>
		((await getStaticProps({ params: p })) as any).props;

	return buildRenderer(Component, { getProps, defaultParams });
}
