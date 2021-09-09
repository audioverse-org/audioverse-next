import BlogPostDetail, { BlogPostDetailProps } from '@containers/blog/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getBlogDetailData,
	getBlogDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { makeBlogPostRoute } from '@lib/routes';

export default BlogPostDetail;

export async function getStaticProps({
	params,
}: {
	params: { id: string; language: string };
}): Promise<StaticProps<BlogPostDetailProps>> {
	const { id, language } = params;
	const { blogPost, blogPosts } = await getBlogDetailData({
		id,
		language: getLanguageIdByRoute(language),
	}).catch(() => ({
		blogPost: null,
		blogPosts: { nodes: [] },
	}));

	return {
		props: {
			blogPost,
			blogPosts,
			title: blogPost?.title || null,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getBlogDetailStaticPaths,
		(d) => d.blogPosts.nodes,
		(baseUrl, node) => makeBlogPostRoute(baseUrl, node.id)
	);
}
