import Stories, { StoriesProps } from '@containers/story/stories';
import { getStoriesPageData, getStoriesPathData } from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Stories;

export interface GetStaticPropsArgs {
	params: {
		language: string;
		i: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps<StoriesProps>> {
	return getPaginatedStaticProps(
		params,
		getStoriesPageData,
		(d) => d.stories.nodes,
		(d) => d.stories.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'stories',
		getStoriesPathData,
		(d) => d.stories.aggregate?.count
	);
}
