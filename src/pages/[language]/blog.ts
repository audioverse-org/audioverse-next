import _ from 'lodash';

import Blog, { BlogProps } from '@containers/blog';
import { LANGUAGES } from '@lib/constants';
import { getBlogPageData, Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { formatPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Blog;

export type BlogStaticProps = StaticProps<BlogProps>;

export async function getStaticProps({
	params,
}: {
	params: { language: Language };
}): Promise<BlogStaticProps> {
	const language = getLanguageIdByRoute(params.language);
	const { blogPosts } = await getBlogPageData({ language }).catch(() => ({
		blogPosts: { nodes: [], aggregate: { count: 0 } },
	}));
	return formatPaginatedStaticProps(
		null,
		blogPosts.nodes || [],
		blogPosts.aggregate?.count || 0
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: _.values(LANGUAGES).map((l) => `/${l.base_url}/blog`),
		fallback: true,
	};
}
