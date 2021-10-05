import { waitFor } from '@testing-library/react';

import { storeRequest } from '@lib/api';
import {
	GetDiscoverPageDataDocument,
	GetDiscoverPageDataQuery,
	RecordingContentType,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildLoader, buildServerRenderer } from '@lib/test/helpers';
import Discover, { getServerSideProps } from '@pages/[language]/discover';

const renderPage = buildServerRenderer(Discover, getServerSideProps);
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
						canonicalPath: 'the_sermon_path',
						recordingContentType: RecordingContentType.Sermon,
						persons: [],
					},
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
					allSequences: {
						aggregate: {
							count: 0,
						},
					},
				},
			],
		},
	}
);

describe('discover page', () => {
	it('stores request', async () => {
		await getServerSideProps({
			req: 'the_request',
			query: { language: 'en' },
		} as any);

		expect(storeRequest).toBeCalledWith('the_request');
	});

	it('renders titles', async () => {
		loadData();

		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('the_sermon_title')).toBeInTheDocument();
		});
	});
});
