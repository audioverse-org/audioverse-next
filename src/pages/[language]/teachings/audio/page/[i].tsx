import { GetStaticPathsResult } from 'next';

import SermonList, { SermonListProps } from '@containers/sermon/list';
import {
	getSermonListPageData,
	getSermonListPagePathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SermonList;

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps<SermonListProps>> {
	const response = await getPaginatedStaticProps(
		params,
		async (variables) => {
			return getSermonListPageData({
				...variables,
				hasVideo: false,
			});
		},
		(d) => d.sermons.nodes,
		(d) => d.sermons.aggregate?.count
	);

	return {
		...response,
		props: {
			...response.props,
			filter: 'audio',
		},
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'teachings/audio',
		({ language }) => getSermonListPagePathsData({ language, hasVideo: false }),
		(d) => d?.sermons.aggregate?.count
	);
}
