import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount, getSermons } from '@lib/api';
import { makeNumberedPaths } from '@lib/getNumberedStaticPaths';
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

	return getPaginatedStaticProps(language, parseInt(i), getSermons);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	const all = await makeNumberedPaths('sermons/all', getSermonCount);
	const video = await makeNumberedPaths('sermons/video', (lang) =>
		getSermonCount(lang, { hasVideo: true })
	);
	const audio = await makeNumberedPaths('sermons/audio', (lang) =>
		getSermonCount(lang, { hasVideo: false })
	);

	return {
		paths: [...all, ...video, ...audio],
		fallback: 'unstable_blocking',
	};
}
