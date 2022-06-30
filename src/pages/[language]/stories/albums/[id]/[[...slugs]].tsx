import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import StoryAlbumDetail, {
	StoryAlbumDetailProps,
} from '@containers/story/albums/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '@lib/constants';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';
import {
	getStoryAlbumDetailPageData,
	getStoryAlbumDetailPathsData,
} from '@containers/story/albums/__generated__/detail';

export default StoryAlbumDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string; language: string }>): Promise<
	GetStaticPropsResult<StoryAlbumDetailProps & IBaseProps>
> {
	const id = params?.id as string;

	const { storySeason: sequence } = await getStoryAlbumDetailPageData({
		id,
	}).catch(() => ({
		storySeason: null,
	}));
	if (
		sequence?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			sequence,
			title: sequence?.title,
			canonicalUrl: sequence?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getStoryAlbumDetailPathsData,
		(d) => d.storySeasons.nodes,
		(languageRoute, { canonicalPath }) => canonicalPath
	);
}
