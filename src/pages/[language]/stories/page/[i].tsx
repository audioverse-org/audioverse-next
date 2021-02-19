import Stories from '@containers/story/stories';
import {
	getStoriesPageData,
	GetStoriesPageDataQuery,
	getStoriesPathData,
} from '@lib/generated/graphql';
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

type Story = NonNullable<GetStoriesPageDataQuery['stories']['nodes']>[0];
export type StoriesStaticProps = PaginatedStaticProps<
	GetStoriesPageDataQuery,
	Story
>;

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StoriesStaticProps> {
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
