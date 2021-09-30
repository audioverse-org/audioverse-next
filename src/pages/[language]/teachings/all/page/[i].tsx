import SermonList, { SermonListProps } from '@containers/sermon/list';
import {
	getSermonListPagePathsData,
	getSermonListStaticProps,
	GetSermonListStaticPropsQuery,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default SermonList;

type Sermon = NonNullable<GetSermonListStaticPropsQuery['sermons']['nodes']>[0];
type PaginatedProps = PaginatedStaticProps<
	GetSermonListStaticPropsQuery,
	Sermon
>;
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
			getSermonListStaticProps({
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

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'teachings/all',
		({ language }) => getSermonListPagePathsData({ language, hasVideo: null }),
		(d) => d?.sermons.aggregate?.count
	);
}
