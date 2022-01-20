import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import SermonEmbed, { SermonEmbedProps } from '@containers/sermon/embed';
import { REVALIDATE } from '@lib/constants';
import {
	getSermonDetailData,
	getSermonDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByLegacyRoute } from '@lib/getLanguageIdByLegacyRoute';

export default SermonEmbed;

export type SermonStaticProps = GetStaticPropsResult<
	SermonEmbedProps & IBaseProps
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
			disableSidebar: true,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSermonDetailStaticPaths,
		(d) => d.sermons.nodes,
		(baseUrl, node) => `/${baseUrl}/embed/media/${node.id}`
	);
}
