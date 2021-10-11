import { GetStaticPathsResult } from 'next';

import Blog, { BlogProps } from '@containers/blog';
import { getBlogPageData, getBlogPathsData } from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Blog;

export interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps<BlogProps>> {
	return getPaginatedStaticProps(
		params,
		getBlogPageData,
		(d) => d.blogPosts.nodes,
		(d) => d.blogPosts.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'blog',
		getBlogPathsData,
		(d) => d.blogPosts.aggregate?.count
	);
}
