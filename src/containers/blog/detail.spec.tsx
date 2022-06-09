import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import {
	GetBlogDetailDataDocument,
	GetBlogDetailStaticPathsDocument,
} from '@containers/blog/detail.gql';
import { fetchApi } from '@lib/api/fetchApi';
import { buildLoader } from '@lib/test/buildLoader';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import BlogPostDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/blog/[id]/[[...slugs]]';

const renderPage = buildStaticRenderer(BlogPostDetail, getStaticProps);

const loadData = buildLoader(GetBlogDetailDataDocument, {
	blogPost: {
		id: 'the_blog_post_id',
		title: 'the_blog_post_title',
		teaser: 'the_blog_post_teaser',
		readingDuration: 520,
		language: Language.English,
	},
	blogPosts: {
		nodes: [],
	},
});

describe('blog post detail page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_blog_post_id',
		});
	});

	it('renders post', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_blog_post_title')).toBeInTheDocument();
		expect(getByText('the_blog_post_teaser')).toBeInTheDocument();
		expect(getByText('8m read')).toBeInTheDocument();

		expect(fetchApi).toBeCalledWith(GetBlogDetailDataDocument, {
			variables: {
				id: 'the_blog_post_id',
				language: 'ENGLISH',
			},
		});
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetBlogDetailStaticPathsDocument, expect.anything())
			.mockResolvedValue({
				blogPosts: {
					nodes: [{ canonicalPath: '/the_blog_post_path' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/the_blog_post_path');
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetBlogDetailDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
