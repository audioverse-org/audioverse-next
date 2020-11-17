import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount, getSermons } from '@lib/api';
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
	const { i, language } = params;

	const response = await getPaginatedStaticProps(
		language,
		parseInt(i),
		async (lang, options) => {
			return getSermons(lang, { ...options, hasVideo: true });
		}
	);

	// TODO: generate rss

	return {
		...response,
		props: {
			...response.props,
			rssPath: `/${language}/sermons/video.xml`,
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('sermons/video', (lang) => {
		return getSermonCount(lang, { hasVideo: true });
	});
}
