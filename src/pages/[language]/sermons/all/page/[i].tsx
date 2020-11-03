import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount, getSermons } from '@lib/api';
import createFeed from '@lib/createFeed';
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
		getSermons
	);

	if (i === '1' && response.props.nodes) {
		await createFeed({
			recordings: response.props.nodes,
			projectRelativePath: `public/${base_url}/sermons/all.xml`,
			title: `AudioVerse Recent Recordings: ${lang.display_name}`,
		});
	}

	return response;
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('sermons/all', getSermonCount);
}
