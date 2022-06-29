import { GetServerSideProps } from 'next';
import { ComponentType } from 'react';

import { buildRenderer, Renderer } from '@lib/test/buildRenderer';
import { ParsedUrlQuery } from 'querystring';

export function buildServerRenderer<P, F extends GetServerSideProps<P>>(
	Component: ComponentType<P>,
	getServerSideProps: F
): Renderer<P> {
	const getProps = async (query: ParsedUrlQuery) => {
		const result = await getServerSideProps({
			query: query,
			params: query,
		} as any);
		if (!('props' in result)) {
			throw new Error('Failed to get server props');
		}
		return result.props;
	};

	return buildRenderer(Component, { getProps });
}
