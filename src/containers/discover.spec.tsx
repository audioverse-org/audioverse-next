import { waitFor } from '@testing-library/react';
import { __loadQuery } from 'next/router';

import {
	GetDiscoverPageDataDocument,
	GetDiscoverPageDataQuery,
	RecordingContentType,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Discover, { getStaticProps } from '@pages/[language]/discover';
import { beforeEach, describe, expect, it } from 'vitest';

const renderPage = buildStaticRenderer(Discover, getStaticProps);
const loadData = buildLoader<GetDiscoverPageDataQuery>(
	GetDiscoverPageDataDocument,
	{
		recentTeachings: {
			nodes: [
				{
					title: 'the_sermon_title',
					canonicalPath: 'the_sermon_path',
					recordingContentType: RecordingContentType.Sermon,
					persons: [],
				},
			],
		},
		trendingTeachings: {
			nodes: [
				{
					recording: {
						title: 'the_sermon_title2',
						canonicalPath: 'the_sermon_path2',
						recordingContentType: RecordingContentType.Sermon,
						persons: [],
					},
				},
			],
		},
		featuredTeachings: {
			nodes: [
				{
					title: 'the_sermon_title3',
					canonicalPath: 'the_sermon_path3',
					recordingContentType: RecordingContentType.Sermon,
					persons: [],
				},
			],
		},
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
		},
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
		},
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
		},
	}
);

describe('discover page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
		});
	});

	it('renders titles', async () => {
		loadData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('the_sermon_title')).toBeInTheDocument();
		});
	});
});
