import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';
import striptags from 'striptags';

import { IBaseProps } from '@containers/base';
import SermonDetail, { SermonDetailProps } from '@containers/sermon/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSermonDetailData,
	getSermonDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByLegacyRoute } from '@lib/getLanguageIdByLegacyRoute';

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
	if (recording?.language !== getLanguageIdByLegacyRoute(params?.language)) {
		return {
			notFound: true,
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
