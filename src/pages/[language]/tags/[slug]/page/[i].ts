import TagDetail from '@containers/tag/detail';
import {
	getTagDetailPageData,
	GetTagDetailPageDataQuery,
	getTagDetailPathsQuery,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import { makeTagDetailRoute } from '@lib/routes';
import writeFeedFile from '@lib/writeFeedFile';

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

const generateRssFeed = async (
	params: GetStaticPropsArgs['params'],
	response: PaginatedProps
) => {
	const { i, language: languageRoute, slug } = params;
	const { display_name } = getLanguageByBaseUrl(languageRoute) || {};

	if (!display_name) return;

	const intl = getIntl(languageRoute);

	const title = intl.formatMessage(
		{
			id: 'tag-feed-title',
			defaultMessage: 'AudioVerse Recordings Tagged {tag} ({lang})',
			description: 'Tag feed title',
		},
		{
			lang: display_name,
			tag: decodeURIComponent(slug),
		}
	);

	if (i === '1' && response.props.nodes) {
		await writeFeedFile({
			recordings: response.props.nodes,
			projectRelativePath: `public/${languageRoute}/tags/${slug}.xml`,
			title,
		});
	}
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

	// TODO: Switch to createFeed function
	await generateRssFeed(params, response);

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
