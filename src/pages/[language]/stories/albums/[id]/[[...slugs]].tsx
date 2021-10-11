import { GetStaticPathsResult } from 'next';

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

export interface GetStaticPropsArgs {
	params: {
		language: string;
		id: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps<StoryAlbumDetailProps>> {
	const { id } = params;

	const { storySeason: sequence } = await getStoryAlbumDetailPageData({
		id,
	}).catch(() => ({
		storySeason: null,
	}));

	return { props: { sequence }, revalidate: REVALIDATE };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getStoryAlbumDetailPathsData,
		(d) => d.storySeasons.nodes,
		(languageRoute, { canonicalPath }) => canonicalPath
	);
}
