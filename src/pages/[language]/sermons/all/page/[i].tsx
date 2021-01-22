import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount } from '@lib/api';
import createFeed from '@lib/createFeed';
import { getSermonListStaticProps } from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default SermonList;

interface StaticProps {
	props: SermonListProps;
	revalidate: number;
}

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

const generateRssFeed = async (
	params: GetStaticPropsArgs['params'],
	response: PaginatedStaticProps
) => {
	const { i, language: languageRoute } = params;
	const { display_name } = getLanguageByBaseUrl(languageRoute) || {};

	if (!display_name) return;

	const intl = getIntl(languageRoute);

	const title = intl.formatMessage(
		{
			id: 'feed-title',
			defaultMessage: 'AudioVerse Recent Recordings: {lang}',
			description: 'All sermons feed title',
		},
		{
			lang: display_name,
		}
	);

	if (i === '1' && response.props.nodes) {
		await createFeed({
			recordings: response.props.nodes,
			projectRelativePath: `public/${languageRoute}/sermons/all.xml`,
			title,
		});
	}
};

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { i, language: base_url } = params;

	const response = await getPaginatedStaticProps(
		base_url,
		i,
		async ({ language, offset, first }) => {
			const result = await getSermonListStaticProps({
				language,
				offset,
				first,
			});

			return result?.sermons;
		}
	);

	await generateRssFeed(params, response);

	return {
		...response,
		props: {
			...response.props,
			rssPath: `/${base_url}/sermons/all.xml`,
			filter: 'all',
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('sermons/all', getSermonCount);
}
