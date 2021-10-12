import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import SermonList, { SermonListProps } from '@containers/sermon/list';
import {
	getSermonListPageData,
	getSermonListPagePathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SermonList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ i: string; language: string }>): Promise<
	GetStaticPropsResult<SermonListProps>
> {
	const response = await getPaginatedStaticProps(
		params,
		async (variables) =>
			getSermonListPageData({
				...variables,
				hasVideo: true,
			}),
		(d) => d.sermons.nodes,
		(d) => d.sermons.aggregate?.count
	);

	return {
		...response,
		props: {
			...response.props,
			filter: 'video',
		},
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'teachings/video',
		({ language }) => getSermonListPagePathsData({ language, hasVideo: true }),
		(d) => d?.sermons.aggregate?.count
	);
}
