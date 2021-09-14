import TagDetail from '@containers/tag/detail';
import {
	getTagDetailPageData,
	GetTagDetailPageDataQuery,
	getTagDetailPathsQuery,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import { makeTagDetailRoute } from '@lib/routes';

export default TagDetail;

type Recording = NonNullable<
	GetTagDetailPageDataQuery['recordings']['nodes']
>[0];
type PaginatedProps = PaginatedStaticProps<
	GetTagDetailPageDataQuery,
	Recording
>;
type StaticProps = PaginatedProps & { props: { rssPath: string } };

type GetStaticPropsArgs = {
	params: { slug: string; language: string; i: string };
};

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { slug, language } = params;

	const response = await getPaginatedStaticProps(
		params,
		async (variables) =>
			getTagDetailPageData({
				...variables,
				tagName: decodeURIComponent(slug),
			}),
		(d) => d.recordings.nodes,
		(d) => d.recordings.aggregate?.count
	);

	return {
		...response,
		props: {
			...response.props,
			rssPath: `/${language}/tags/${slug}.xml`,
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	// TODO: eventually switch to using API-supplied canonical URL
	return getDetailStaticPaths(
		getTagDetailPathsQuery,
		(d) => d.tags.nodes,
		(languageRoute, node) => makeTagDetailRoute(languageRoute, node.name)
	);
}
