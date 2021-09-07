import Story, { StoryDetailProps } from '@containers/story/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getStoryDetailData,
	getStoryDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeStoryRoute } from '@lib/routes';

export default Story;

interface StaticProps {
	props: StoryDetailProps;
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

	const { story: recording } = await getStoryDetailData({ id }).catch(() => ({
		story: null,
	}));

	return { props: { recording }, revalidate: REVALIDATE };
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getStoryDetailStaticPaths,
		(d) => d.stories.nodes,
		(languageRoute, node) => makeStoryRoute(languageRoute, node.id)
	);
}
