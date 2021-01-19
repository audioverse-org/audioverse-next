import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount } from '@lib/api';
import createFeed from '@lib/createFeed';
import { getSermonListStaticProps, Language } from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SermonList;

interface StaticProps {
	props: SermonListProps;
	revalidate: number;
}

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { i, language: base_url } = params;

	const lang = getLanguageByBaseUrl(base_url);

	const response = await getPaginatedStaticProps(
		base_url,
		parseInt(i),
		async (language: Language, { offset, first }) => {
			// TODO: Refactor to eliminate this wrapper
			const result = await getSermonListStaticProps({
				language,
				offset,
				first,
			});

			return result?.sermons;
		}
	);

	// TODO: Extract feed generation into its own function for readability

	const intl = getIntl(base_url);

	const title = intl.formatMessage(
		{
			id: 'feed-title',
			defaultMessage: 'AudioVerse Recent Recordings: {lang}',
			description: 'All sermons feed title',
		},
		{
			lang: lang?.display_name,
		}
	);

	// TODO: Find a less-hacky way to generate feeds regularly.
	//  This solution may generate the feed too much or not enough.
	if (i === '1' && response.props.nodes) {
		await createFeed({
			recordings: response.props.nodes,
			projectRelativePath: `public/${base_url}/sermons/all.xml`,
			title,
		});
	}

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
