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
	params: { i: string; filter: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { i, filter, language } = params;

	return getPaginatedStaticProps(
		language,
		parseInt(i),
		async (lang, options) => {
			if (filter === 'video' || filter === 'audio') {
				options.hasVideo = filter === 'video';
			}

			return getSermons(lang, options);
		}
	);
}

const makeListPaths = async (
	pathModifier: string,
	hasVideo: boolean | null = null
) => {
	return makeNumberedPaths(`sermons/${pathModifier}`, (lang) =>
		getSermonCount(lang, { hasVideo })
	);
};

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: [
			...(await makeListPaths('all')),
			...(await makeListPaths('video', true)),
			...(await makeListPaths('audio', false)),
		],
		fallback: 'unstable_blocking',
	};
}
