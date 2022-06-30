import CustomPageDetail, {
	CustomPageDetailProps,
} from '@containers/page/detail';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';
import { IBaseProps } from '@containers/base';
import { PageType } from '@src/__generated__/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getCustomDetailPageData,
	getCustomDetailPageStaticPaths,
} from '@containers/page/__generated__/detail';

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
		(l, n) => `/${l}/page/${n.id}/${n.slug}`
	);
}
