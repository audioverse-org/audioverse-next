import { when } from 'jest-when';

import {
	GetBlogDetailDataDocument,
	GetBlogDetailStaticPathsDocument,
	Language,
} from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import BlogPostDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/blog/[id]/[[...slugs]]';

import { _loadQuery } from '../../__mocks__/next/router';

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
		_loadQuery({
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
					nodes: [{ canonicalPath: '/the_blog_post_path' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/the_blog_post_path');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetBlogDetailDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
