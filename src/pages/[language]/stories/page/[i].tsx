import Stories from '@containers/story/stories';
import { getStoriesPageData, getStoriesPathData } from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default Stories;

export interface GetStaticPropsArgs {
	params: {
		language: string;
		i: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<PaginatedStaticProps> {
	const { language, i } = params;

	return getPaginatedStaticProps(language, i, async (vars) => {
		return (await getStoriesPageData(vars)).stories;
	});
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('stories', async (language) => {
		const response = await getStoriesPathData({ language });
		return response.stories.aggregate?.count || 0;
	});
}
