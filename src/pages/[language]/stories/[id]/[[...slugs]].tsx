import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Story, { StoryDetailProps } from '@containers/story/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getStoryDetailData,
	getStoryDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default Story;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
}>): Promise<GetStaticPropsResult<StoryDetailProps>> {
	const id = params?.id as string;

	const { story: recording } = await getStoryDetailData({ id }).catch(() => ({
		story: null,
	}));

	return { props: { recording }, revalidate: REVALIDATE };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getStoryDetailStaticPaths,
		(d) => d.stories.nodes,
		(languageRoute, { canonicalPath }) => canonicalPath
	);
}
