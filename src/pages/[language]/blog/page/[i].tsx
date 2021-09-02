import Blog from '@containers/blog';
import {
	getBlogPageData,
	GetBlogPageDataQuery,
	getBlogPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default Blog;

type BlogPost = NonNullable<GetBlogPageDataQuery['blogPosts']['nodes']>[0];
export type BlogStaticProps = PaginatedStaticProps<
	GetBlogPageDataQuery,
	BlogPost
>;

export interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<BlogStaticProps> {
	return getPaginatedStaticProps(
		params,
		getBlogPageData,
		(d) => d.blogPosts.nodes,
		(d) => d.blogPosts.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'blog',
		getBlogPathsData,
		(d) => d.blogPosts.aggregate?.count
	);
}
