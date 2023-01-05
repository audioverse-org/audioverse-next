import { __loadQuery } from 'next/router';

import { __load, __loadReject, fetchApi } from '@lib/api/fetchApi';
import {
	GetBlogDetailDataDocument,
	GetBlogDetailStaticPathsDocument,
	Language,
} from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import BlogPostDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/blog/[id]/[[...slugs]]';
import { beforeEach, describe, expect, it } from 'vitest';

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
		__load(GetBlogDetailStaticPathsDocument, {
			blogPosts: {
				nodes: [{ canonicalPath: 'the_blog_post_path' }],
			},
		});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('the_blog_post_path');
	});

	it('renders 404', async () => {
		__loadReject(GetBlogDetailDataDocument, 'oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
