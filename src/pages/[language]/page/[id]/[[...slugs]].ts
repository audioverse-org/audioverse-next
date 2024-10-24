import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import {
	getCustomDetailPageData,
	getCustomDetailPageStaticPaths,
} from '~containers/page/__generated__/detail';
import CustomPageDetail, {
	CustomPageDetailProps,
} from '~containers/page/detail';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { PageType } from '~src/__generated__/graphql';

export default CustomPageDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string; language: string }>): Promise<
	GetStaticPropsResult<CustomPageDetailProps & IBaseProps>
> {
	const { id } = params || {};

	if (!id) {
		return {
			notFound: true,
		};
	}

	return {
		props: await getCustomDetailPageData({ id }),
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getCustomDetailPageStaticPaths,
		(d) => d.pages.nodes?.filter((p) => p.type === PageType.Custom),
		(l, n) => `/${l}/page/${n.id}/${n.slug}`,
	);
}
