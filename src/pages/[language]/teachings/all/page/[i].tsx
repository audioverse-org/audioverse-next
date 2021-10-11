import { GetStaticPathsResult } from 'next';

import SermonList, { SermonListProps } from '@containers/sermon/list';
import {
	getSermonListPageData,
	GetSermonListPageDataQuery,
	getSermonListPagePathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default SermonList;

type Sermon = NonNullable<GetSermonListPageDataQuery['sermons']['nodes']>[0];
type PaginatedProps = PaginatedStaticProps<GetSermonListPageDataQuery, Sermon>;
type StaticProps = PaginatedProps & {
	props: SermonListProps;
};

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const response = await getPaginatedStaticProps(
		params,
		async (variables) =>
			getSermonListPageData({
				...variables,
				hasVideo: null,
			}),
		(d) => d.sermons.nodes,
		(d) => d.sermons.aggregate?.count
	);

	return {
		...response,
		props: {
			...response.props,
			filter: 'all',
		},
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'teachings/all',
		({ language }) => getSermonListPagePathsData({ language, hasVideo: null }),
		(d) => d?.sermons.aggregate?.count
	);
}
