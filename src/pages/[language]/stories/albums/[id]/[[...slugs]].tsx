import StoryAlbumDetail, {
	StoryAlbumDetailProps,
} from '@containers/story/albums/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getStoryAlbumDetailPageData,
	getStoryAlbumDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default StoryAlbumDetail;

interface StaticProps {
	props: StoryAlbumDetailProps;
	revalidate: number;
}

export interface GetStaticPropsArgs {
	params: {
		language: string;
		id: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { id } = params;

	const { storySeason: sequence } = await getStoryAlbumDetailPageData({
		id,
	}).catch(() => ({
		storySeason: null,
	}));

	return { props: { sequence }, revalidate: REVALIDATE };
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getStoryAlbumDetailPathsData,
		(d) => d.storySeasons.nodes,
		(languageRoute, { canonicalPath }) => canonicalPath
	);
}
