import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import Discover, { getStaticProps } from '~pages/[language]/discover';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import { __apiDocumentMock, fetchApi } from '~src/lib/api/fetchApi';
import { createControlledPromise } from '~src/lib/test/loadControlledPromise';

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

const recentTeachingsDefaults = {
	recentTeachings: {
		nodes: [recentTeaching],
		...base,
	},
};

const loadRecentTeachings = buildLoader<GetDiscoverRecentTeachingsQuery>(
	GetDiscoverRecentTeachingsDocument,
	recentTeachingsDefaults
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

		const next = await screen.findByLabelText('Next recent teachings');

		userEvent.click(next);

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

		const { controller } = loadRecentTeachings(
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

		const next = await screen.findByLabelText('Next recent teachings');

		userEvent.click(next);

		expect(screen.getByText('recent_sermon_title_1')).toBeInTheDocument();

		controller?.resolve();
	});

	it('disables next button if no next page', async () => {
		await renderPage();

		const next = await screen.findByLabelText('Next recent teachings');

		expect(next).toBeDisabled();
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

	it('only preloads 3 pages in advance', async () => {
		loadRecentTeachings({
			recentTeachings: {
				pageInfo: {
					hasNextPage: true,
					endCursor: 'cursor',
				},
			},
		});

		await renderPage();

		// expect page to render without looping forever
	});

	it('does not await page load if page is already loaded', async () => {
		// prepare mock
		const m = __apiDocumentMock(GetDiscoverRecentTeachingsDocument);
		when(m).resetWhenMocks();

		// load first page response
		when(m)
			.calledWith(
				expect.objectContaining({
					after: null,
				})
			)
			.mockResolvedValue({
				recentTeachings: {
					nodes: [
						{
							...recentTeaching,
							title: 'page1',
						},
					],
					pageInfo: {
						hasNextPage: true,
						endCursor: 'cursor1',
					},
				},
			});

		// load deferred second page response
		const c1 = createControlledPromise();
		when(m)
			.calledWith(
				expect.objectContaining({
					after: 'cursor1',
				})
			)
			.mockReturnValue(c1.promise);

		// load deferred third page response
		const c2 = createControlledPromise();
		when(m)
			.calledWith(
				expect.objectContaining({
					after: 'cursor2',
				})
			)
			.mockReturnValue(c2.promise);

		// render page
		await renderPage();

		// find next button
		const next = await screen.findByLabelText('Next recent teachings');

		// confirm that first page is visible
		screen.getByText('page1');

		// resolve second page
		c1.resolve({
			recentTeachings: {
				nodes: [
					{
						...recentTeaching,
						title: 'page2',
					},
				],
				pageInfo: {
					hasNextPage: true,
					endCursor: 'cursor2',
				},
			},
		});

		// click next button
		userEvent.click(next);

		// confirm that second page is visible before third page is loaded
		expect(await screen.findByText('page2')).toBeInTheDocument();

		// resolve third page
		c2.resolve({
			recentTeachings: {
				nodes: [
					{
						...recentTeaching,
						title: 'page3',
					},
				],
				pageInfo: {
					hasNextPage: false,
					endCursor: null,
				},
			},
		});
	});
});
