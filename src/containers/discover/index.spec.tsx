import { screen } from '@testing-library/react';
import { __loadQuery } from 'next/router';

import { mockWidth } from '~components/organisms/cardSlider/index.spec';
import { __swiper } from '~lib/swiper';
import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import Discover, { getStaticProps } from '~pages/[language]/discover';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import {
	GetSectionBlogPostsDocument,
	GetSectionBlogPostsQuery,
} from '~src/components/organisms/cardSlider/section/__generated__/blogPosts';
import {
	GetSectionConferencesDocument,
	GetSectionConferencesQuery,
} from '~src/components/organisms/cardSlider/section/__generated__/conferences';
import {
	GetSectionFeaturedTeachingsDocument,
	GetSectionFeaturedTeachingsQuery,
} from '~src/components/organisms/cardSlider/section/__generated__/featuredTeachings';
import {
	GetSectionRecentTeachingsDocument,
	GetSectionRecentTeachingsQuery,
} from '~src/components/organisms/cardSlider/section/__generated__/recentTeachings';
import {
	GetSectionStorySeasonsDocument,
	GetSectionStorySeasonsQuery,
} from '~src/components/organisms/cardSlider/section/__generated__/storySeasons';
import {
	GetSectionTrendingTeachingsDocument,
	GetSectionTrendingTeachingsQuery,
} from '~src/components/organisms/cardSlider/section/__generated__/trendingTeachings';
import { __apiDocumentMock } from '~src/lib/api/fetchApi';

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

const loadRecentTeachings = buildLoader<GetSectionRecentTeachingsQuery>(
	GetSectionRecentTeachingsDocument,
	recentTeachingsDefaults
);

const loadTrendingTeachings = buildLoader<GetSectionTrendingTeachingsQuery>(
	GetSectionTrendingTeachingsDocument,
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

const loadFeaturedTeachings = buildLoader<GetSectionFeaturedTeachingsQuery>(
	GetSectionFeaturedTeachingsDocument,
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

const loadStorySeasons = buildLoader<GetSectionStorySeasonsQuery>(
	GetSectionStorySeasonsDocument,
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

const loadConferences = buildLoader<GetSectionConferencesQuery>(
	GetSectionConferencesDocument,
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

const loadBlogPosts = buildLoader<GetSectionBlogPostsQuery>(
	GetSectionBlogPostsDocument,
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
		mockWidth(1);
	});

	it('renders titles', async () => {
		await renderPage();

		expect(await screen.findByText('recent_sermon_title')).toBeInTheDocument();
	});

	it('disables next button if no next page', async () => {
		__swiper.isEnd = true;

		await renderPage();

		const next = await screen.findByLabelText('Next recent teachings');

		expect(next).toBeDisabled();
	});
});
