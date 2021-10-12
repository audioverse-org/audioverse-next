import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Blog, { BlogProps } from '@containers/blog';
import { getBlogPageData, getBlogPathsData } from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Blog;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ i: string; language: string }>): Promise<
	GetStaticPropsResult<BlogProps>
> {
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
