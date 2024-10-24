import { GetServerSidePropsResult } from 'next';
import { ComponentType } from 'react';

import { buildPageRenderer, PageRenderer } from './buildPageRenderer';

export function buildServerRenderer<T extends Record<string, unknown>>(
	Component: ComponentType<T>,
	getServerSideProps: (context: any) => Promise<GetServerSidePropsResult<any>>,
): PageRenderer<T> {
	const getProps = async (p: any) => {
		const r = await getServerSideProps({ params: p, query: p } as any);
		if (!('props' in r)) throw new Error('Failed to get server props');
		return r.props;
	};

	return buildPageRenderer(Component, { getProps });
}
