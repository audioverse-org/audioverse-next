import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __loadQuery } from 'next/router';

import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import Discover, { getStaticProps } from '~pages/[language]/discover';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import { fetchApi } from '~src/lib/api/fetchApi';

import {
	GetDiscoverBlogPostsDocument,
	GetDiscoverBlogPostsQuery,
	GetDiscoverConferencesDocument,
	GetDiscoverConferencesQuery,
	GetDiscoverFeaturedTeachingsDocument,
	GetDiscoverFeaturedTeachingsQuery,
	GetDiscoverRecentTeachingsDocument,
	GetDiscoverRecentTeachingsQuery,
	GetDiscoverStorySeasonsDocument,
	GetDiscoverStorySeasonsQuery,
	GetDiscoverTrendingTeachingsDocument,
	GetDiscoverTrendingTeachingsQuery,
} from './__generated__/discover';

const renderPage = buildStaticRenderer(Discover, getStaticProps);

const base = {
	// aggregate: {
	// 	count: 1,
	// },
	pageInfo: {
		hasNextPage: false,
		endCursor: null,
	},
};

const recentTeaching = {
	title: 'recent_sermon_title',
	canonicalPath: 'the_sermon_path',
	recordingContentType: RecordingContentType.Sermon,
	persons: [],
};

const loadRecentTeachings = buildLoader<GetDiscoverRecentTeachingsQuery>(
	GetDiscoverRecentTeachingsDocument,
	{
		recentTeachings: {
			nodes: [recentTeaching],
			...base,
		},
	}
);

const loadTrendingTeachings = buildLoader<GetDiscoverTrendingTeachingsQuery>(
	GetDiscoverTrendingTeachingsDocument,
	{
		trendingTeachings: {
			nodes: [
				{
					recording: {
						title: 'trending_sermon_title',
						canonicalPath: 'the_sermon_path2',
						recordingContentType: RecordingContentType.Sermon,
						persons: [],
					},
				},
			],
			...base,
		},
	}
);

const loadFeaturedTeachings = buildLoader<GetDiscoverFeaturedTeachingsQuery>(
	GetDiscoverFeaturedTeachingsDocument,
	{
		featuredTeachings: {
			nodes: [
				{
					title: 'featured_sermon_title',
					canonicalPath: 'the_sermon_path3',
					recordingContentType: RecordingContentType.Sermon,
					persons: [],
				},
			],
			...base,
		},
	}
);

const loadStorySeasons = buildLoader<GetDiscoverStorySeasonsQuery>(
	GetDiscoverStorySeasonsDocument,
	{
		storySeasons: {
			nodes: [
				{
					title: 'the_story_title',
					canonicalPath: 'the_story_path',
					contentType: SequenceContentType.StorySeason,
					speakers: {
						nodes: [],
					},
					recordings: {
						nodes: [],
					},
					allRecordings: {
						aggregate: {
							count: 0,
						},
					},
				},
			],
			...base,
		},
	}
);

const loadConferences = buildLoader<GetDiscoverConferencesQuery>(
	GetDiscoverConferencesDocument,
	{
		conferences: {
			nodes: [
				{
					title: 'the_conference_title',
					canonicalPath: 'the_conference_path',
					sequences: {
						nodes: [],
					},
					recordings: {
						nodes: [],
					},
					allSequences: {
						aggregate: {
							count: 0,
						},
					},
					allRecordings: {
						aggregate: {
							count: 0,
						},
					},
				},
			],
			...base,
		},
	}
);

const loadBlogPosts = buildLoader<GetDiscoverBlogPostsQuery>(
	GetDiscoverBlogPostsDocument,
	{
		blogPosts: {
			nodes: [
				{
					image: {
						url: 'the_post_image_url',
					},
					publishDate: '2019-12-03T09:54:33Z',
					title: 'the_post_title',
					teaser: 'the_post_teaser',
					canonicalPath: 'the_post_path',
					readingDuration: 9 * 60,
				},
			],
			...base,
		},
	}
);

const loadData = () => {
	loadRecentTeachings();
	loadTrendingTeachings();
	loadFeaturedTeachings();
	loadStorySeasons();
	loadConferences();
	loadBlogPosts();
};

describe('discover page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
		});
		loadData();
	});

	it('renders titles', async () => {
		await renderPage();

		expect(await screen.findByText('recent_sermon_title')).toBeInTheDocument();
	});

	it('handles slider next', async () => {
		loadRecentTeachings(
			{
				recentTeachings: {
					nodes: [
						{
							...recentTeaching,
							title: 'recent_sermon_title_1',
						},
						{
							...recentTeaching,
							title: 'recent_sermon_title_2',
						},
						{
							...recentTeaching,
							title: 'recent_sermon_title_3',
						},
					],
					pageInfo: {
						hasNextPage: true,
						endCursor: 'recentTeachingCursor',
					},
				},
			},
			{
				variables: expect.objectContaining({
					after: null,
				}),
			}
		);
		loadRecentTeachings(
			{
				recentTeachings: {
					nodes: [
						{
							...recentTeaching,
							title: 'recent_sermon_title_4',
						},
					],
					pageInfo: {
						hasNextPage: false,
						endCursor: null,
					},
				},
			},
			{ variables: expect.objectContaining({ after: expect.any(String) }) }
		);
		await renderPage();

		await screen.findByText('recent_sermon_title_1');

		const nextButtons = await screen.findAllByText('next');

		userEvent.click(nextButtons[0]);

		expect(
			await screen.findByText('recent_sermon_title_4')
		).toBeInTheDocument();
	});

	it('displays last page while loading next page', async () => {
		loadRecentTeachings(
			{
				recentTeachings: {
					nodes: [
						{
							...recentTeaching,
							title: 'recent_sermon_title_1',
						},
						{
							...recentTeaching,
							title: 'recent_sermon_title_2',
						},
						{
							...recentTeaching,
							title: 'recent_sermon_title_3',
						},
					],
					pageInfo: {
						hasNextPage: true,
						endCursor: 'recentTeachingCursor',
					},
				},
			},
			{
				variables: expect.objectContaining({
					after: null,
				}),
			}
		);

		const { promiseController } = loadRecentTeachings(
			{
				recentTeachings: {
					nodes: [
						{
							...recentTeaching,
							title: 'recent_sermon_title_4',
						},
					],
					pageInfo: {
						hasNextPage: false,
						endCursor: null,
					},
				},
			},
			{
				variables: expect.objectContaining({
					after: expect.any(String),
				}),
				controlled: true,
			}
		);

		await renderPage();

		await screen.findByText('recent_sermon_title_1');

		const nextButtons = await screen.findAllByText('next');

		userEvent.click(nextButtons[0]);

		expect(screen.getByText('recent_sermon_title_1')).toBeInTheDocument();

		promiseController?.resolve();
	});

	it('disables next button if no next page', async () => {
		await renderPage();

		const nextButtons = await screen.findAllByText('next');

		expect(nextButtons[0]).toBeDisabled();
	});

	it('preloads pages', async () => {
		loadRecentTeachings(
			{
				recentTeachings: {
					nodes: [
						{
							title: 'recent_sermon_title_first',
							canonicalPath: 'the_sermon_path',
							recordingContentType: 'SERMON',
							persons: [],
						},
					],
					pageInfo: {
						hasNextPage: true,
						endCursor: 'cursor',
					},
				},
			},
			{
				variables: expect.objectContaining({
					after: null,
				}),
			}
		);

		await renderPage();

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(GetDiscoverRecentTeachingsDocument, {
				variables: expect.objectContaining({
					after: 'cursor',
				}),
			});
		});
	});
});
