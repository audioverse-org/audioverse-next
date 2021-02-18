import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount } from '@lib/api';
import { getSermonListStaticProps } from '@lib/generated/graphql';
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
	const { language } = params;

	const response = await getPaginatedStaticProps(
		params,
		async (variables) =>
			getSermonListStaticProps({
				...variables,
				hasVideo: true,
			}),
		'sermons.nodes',
		'sermons.aggregate.count'
	);

	// TODO: generate rss

	return {
		...response,
		props: {
			...response.props,
			rssPath: `/${language}/sermons/video.xml`,
			filter: 'video',
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('sermons/video', (lang) => {
		return getSermonCount(lang, { hasVideo: true });
	});
}
