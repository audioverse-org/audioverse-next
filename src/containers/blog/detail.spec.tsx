import { when } from 'jest-when';

import {
	GetBlogDetailDataDocument,
	GetBlogDetailStaticPathsDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import BlogPostDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/blog/[id]';

jest.mock('@lib/writeFeedFile');

const renderPage = buildStaticRenderer(BlogPostDetail, getStaticProps, {
	language: 'en',
	id: 'the_blog_post_id',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetBlogDetailDataDocument, expect.anything())
		.mockResolvedValue({
			blogPost: {
				id: 'the_blog_post_id',
				title: 'the_blog_post_title',
				teaser: 'the_blog_post_teaser',
				readingDuration: 520,
			},
			blogPosts: {
				nodes: [],
			},
		});
}

describe('blog post detail page', () => {
	it('renders post', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_blog_post_title')).toBeInTheDocument();
		expect(getByText('the_blog_post_teaser')).toBeInTheDocument();
		expect(getByText('8m read')).toBeInTheDocument();

		expect(mockedFetchApi).toBeCalledWith(GetBlogDetailDataDocument, {
			variables: {
				id: 'the_blog_post_id',
				language: 'ENGLISH',
			},
		});
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetBlogDetailStaticPathsDocument, expect.anything())
			.mockResolvedValue({
				blogPosts: {
					nodes: [{ id: 'the_blog_post_id' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/blog/the_blog_post_id');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetBlogDetailDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});
