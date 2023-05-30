import { screen } from '@testing-library/react';
import { __loadQuery } from 'next/router';

import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import Discover, { getStaticProps } from '~pages/[language]/discover';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import { __apiDocumentMock } from '~src/lib/api/fetchApi';

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

	it('disables next button if no next page', async () => {
		await renderPage();

		const next = await screen.findByLabelText('Next recent teachings');

		expect(next).toBeDisabled();
	});
});
