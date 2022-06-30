import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Blog, { BlogProps } from '@containers/blog';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import {
	getBlogPageData,
	getBlogPathsData,
} from '@containers/__generated__/blog';

export default Blog;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ i: string; language: string }>): Promise<
	GetStaticPropsResult<BlogProps>
> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return getPaginatedStaticProps(
		params,
		getBlogPageData,
		(d) => d.blogPosts.nodes,
		(d) => d.blogPosts.aggregate?.count,
		() => ({
			title: intl.formatMessage({
				id: 'blog__title',
				defaultMessage: 'All Blog Posts',
			}),
		})
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'blog',
		getBlogPathsData,
		(d) => d.blogPosts.aggregate?.count
	);
}
