import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import SermonDetail, { SermonDetailProps } from '@containers/sermon/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSermonDetailData,
	getSermonDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default SermonDetail;

export type SermonStaticProps = GetStaticPropsResult<
	SermonDetailProps & {
		title?: string;
	}
>;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<SermonStaticProps> {
	const id = params?.id as string;
	const { sermon: recording } = await getSermonDetailData({ id }).catch(() => ({
		sermon: null,
	}));

	return {
		props: {
			recording,
			title: recording?.title,
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
