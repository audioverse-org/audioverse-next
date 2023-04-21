import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import {
	getStoriesAlbumsPageData,
	getStoriesAlbumsPathData,
} from '~containers/story/albums/__generated__/list';
import StoryAlbumsList, {
	StoryAlbumsListProps,
} from '~containers/story/albums/list';
import { getNumberedStaticPaths } from '~lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '~lib/getPaginatedStaticProps';

export default StoryAlbumsList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	i: string;
}>): Promise<GetStaticPropsResult<StoryAlbumsListProps>> {
	return getPaginatedStaticProps(
		params,
		getStoriesAlbumsPageData,
		(d) => d.storySeasons.nodes,
		(d) => d.storySeasons.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'stories/albums',
		getStoriesAlbumsPathData,
		(d) => d.storySeasons.aggregate?.count
	);
}
