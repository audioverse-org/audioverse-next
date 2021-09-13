import SermonList from '@containers/sermon/list';
import { createFeed } from '@lib/createFeed';
import {
	getSermonListPagePathsData,
	getSermonListStaticProps,
	GetSermonListStaticPropsQuery,
} from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
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
	props: { rssPath: string; filter: string };
};

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { language: base_url, i } = params;

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

	if (i == '1') {
		const intl = getIntl(base_url);
		await createFeed(
			intl.formatMessage({
				id: 'sermons-all-rss-identifier',
				defaultMessage: 'All Teachings',
				description: 'All teachings RSS feed pretty identifier',
			}),
			params,
			response.props.nodes,
			'teachings/all.xml'
		);
	}

	return {
		...response,
		props: {
			...response.props,
			rssPath: `/${base_url}/teachings/all.xml`,
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
