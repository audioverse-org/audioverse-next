import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount, getSermons } from '@lib/api';
import { getNumberedStaticPaths, getPaginatedStaticProps } from '@lib/helpers';

export default SermonList;

interface StaticProps {
	props: SermonListProps;
	revalidate: number;
}

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({ params }: GetStaticPropsArgs): Promise<StaticProps> {
	const { i, language } = params;

	return await getPaginatedStaticProps(language, parseInt(i), getSermons);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return await getNumberedStaticPaths('sermons/page', getSermonCount);
}
