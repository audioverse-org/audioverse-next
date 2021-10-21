import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Blog, { BlogProps } from '@containers/blog';
import { getBlogPageData, Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { formatPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeBlogPostListRoute } from '@lib/routes';

export default Blog;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: Language }>): Promise<
	GetStaticPropsResult<BlogProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	const { blogPosts } = await getBlogPageData({ language }).catch(() => ({
		blogPosts: { nodes: [], aggregate: { count: 0 } },
	}));
	return formatPaginatedStaticProps(
		null,
		blogPosts.nodes || [],
		blogPosts.aggregate?.count || 0
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			makeBlogPostListRoute(base_url)
		),
		fallback: false,
	};
}
