import { GetServerSidePropsResult } from 'next';
import { ComponentType } from 'react';

import { buildRenderer, Renderer } from '@lib/test/buildRenderer';

export function buildServerRenderer<
	C extends ComponentType<any>,
	F extends (context: any) => Promise<GetServerSidePropsResult<any>>
>(Component: C, getServerSideProps: F): Renderer {
	const getProps = async (p: any) => {
		const result = await getServerSideProps({ params: p, query: p } as any);
		if (!('props' in result)) {
			throw new Error('Failed to get server props');
		}
		return result.props;
	};

	return buildRenderer(Component, { getProps });
}
