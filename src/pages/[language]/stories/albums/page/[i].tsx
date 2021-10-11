import { GetStaticPathsResult } from 'next';

import StoryAlbumsList, {
	StoryAlbumsListProps,
} from '@containers/story/albums/list';
import {
	getStoriesAlbumsPageData,
	getStoriesAlbumsPathData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default StoryAlbumsList;

export interface GetStaticPropsArgs {
	params: {
		language: string;
		i: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps<StoryAlbumsListProps>> {
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
