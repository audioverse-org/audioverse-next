import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import About, { AboutProps } from '@containers/about';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import { getAboutPageData, getAboutStaticPaths } from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default About;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<
	GetStaticPropsResult<AboutProps & IBaseProps>
> {
	const id = params?.id as string;

	const { page } = await getAboutPageData({
		id,
	}).catch(() => ({
		page: null,
	}));

	return {
		props: {
			page,
			title: page?.title,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getAboutStaticPaths,
		(d) => d.pages.nodes,
		(l, { canonicalPath }) => canonicalPath
	);
}
