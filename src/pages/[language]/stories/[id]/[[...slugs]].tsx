import { GetStaticPathsResult } from 'next';

import Story, { StoryDetailProps } from '@containers/story/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getStoryDetailData,
	getStoryDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default Story;

export interface GetStaticPropsArgs {
	params: {
		language: string;
		id: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps<StoryDetailProps>> {
	const { id } = params;

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
