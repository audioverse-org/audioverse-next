import TagDetail, { TagDetailProps } from '@containers/tag/detail';
import createFeed from '@lib/createFeed';
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
import { makeTagRoute } from '@lib/routes';

export default TagDetail;

interface StaticProps {
	props: TagDetailProps;
	revalidate: number;
}

type GetStaticPropsArgs = {
	params: { slug: string; language: string; i: string };
};

const generateRssFeed = async (
	params: GetStaticPropsArgs['params'],
	response: PaginatedStaticProps<GetTagDetailPageDataQuery>
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
		await createFeed({
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
		'recordings.nodes',
		'recordings.aggregate.count'
	);

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
		'tags.nodes',
		(languageRoute, node) => makeTagRoute(languageRoute, node.name)
	);
}
