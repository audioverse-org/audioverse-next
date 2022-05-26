import { GetServerSidePropsResult } from 'next';
import { ComponentType } from 'react';

import { buildRenderer, Renderer } from '@lib/test/buildRenderer';

export function buildServerRenderer<
	C extends ComponentType<any>,
	F extends (context: any) => Promise<GetServerSidePropsResult<any>>,
	P extends Partial<Parameters<F>[0]['params']>
>(
	Component: C,
	getServerSideProps: F,
	defaultParams: P = {} as P
): Renderer<P> {
	const getProps = async (p: any) => {
		const result = await getServerSideProps({ params: p, query: p } as any);
		if (!('props' in result)) {
			throw new Error('Failed to get server props');
		}
		return result.props;
	};

	return buildRenderer(Component, { getProps, defaultParams });
}
