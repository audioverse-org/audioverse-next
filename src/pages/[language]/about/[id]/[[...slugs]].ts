import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import About, { AboutProps } from '@containers/about';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getAboutPageData,
	getAboutStaticPaths,
} from '@containers/about/__generated__';
import { PageType } from '@src/__generated__/graphql';

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
		(d) => d.pages.nodes?.filter((p) => p.type === PageType.About),
		(l, { canonicalPath }) => canonicalPath
	);
}
