import { ComponentType } from 'react';

import { buildRenderer, Renderer } from '@lib/test/buildRenderer';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

export function buildStaticRenderer<P, F extends GetStaticProps<P, any>>(
	Component: ComponentType<P>,
	getStaticProps: F
): Renderer<P> {
	const getProps = async (query: ParsedUrlQuery): Promise<Partial<P>> => {
		const result = await getStaticProps({ params: query });

		return 'props' in result ? result.props : {};
	};

	return buildRenderer(Component, { getProps });
}
