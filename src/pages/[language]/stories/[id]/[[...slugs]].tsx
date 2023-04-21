import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import {
	getStoryDetailData,
	getStoryDetailStaticPaths,
} from '~containers/story/__generated__/detail';
import Story, { StoryDetailProps } from '~containers/story/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';

export default Story;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
}>): Promise<GetStaticPropsResult<StoryDetailProps & IBaseProps>> {
	const id = params?.id as string;

	const { story: recording } = await getStoryDetailData({ id }).catch(() => ({
		story: null,
	}));
	if (
		recording?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			recording,
			title: recording?.title,
			canonicalUrl: recording?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getStoryDetailStaticPaths,
		(d) => d.stories.nodes,
		(languageRoute, { canonicalPath }) => canonicalPath
	);
}
