import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';
import striptags from 'striptags';

import { IBaseProps } from '~containers/base';
import {
	getSermonDetailData,
	getSermonDetailStaticPaths,
} from '~containers/sermon/__generated__/detail';
import SermonDetail, { SermonDetailProps } from '~containers/sermon/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';

export default SermonDetail;

export type SermonStaticProps = GetStaticPropsResult<
	SermonDetailProps & IBaseProps
>;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
}>): Promise<SermonStaticProps> {
	const id = params?.id as string;
	const { sermon: recording } = await getSermonDetailData({ id }).catch(() => ({
		sermon: null,
	}));
	if (
		recording?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			recording,
			title: recording?.title,
			description: striptags(recording?.description || ''),
			canonicalUrl: recording?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSermonDetailStaticPaths,
		(d) => d.sermons.nodes,
		(baseUrl, node) => node.canonicalPath
	);
}
