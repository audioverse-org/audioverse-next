import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import BlogPostDetail, { BlogPostDetailProps } from '@containers/blog/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getBlogDetailData,
	getBlogDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default BlogPostDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string; language: string }>): Promise<
	GetStaticPropsResult<BlogPostDetailProps & IBaseProps>
> {
	const { blogPost, blogPosts } = await getBlogDetailData({
		id: params?.id as string,
		language: getLanguageIdByRoute(params?.language),
	}).catch(() => ({
		blogPost: null,
		blogPosts: { nodes: [] },
	}));

	return {
		props: {
			blogPost,
			blogPosts,
			title: blogPost?.title,
			canonicalUrl: blogPost?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getBlogDetailStaticPaths,
		(d) => d.blogPosts.nodes,
		(baseUrl, { canonicalPath }) => canonicalPath
	);
}
