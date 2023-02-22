import { __loadQuery } from 'next/router';
import React from 'react';

import {
	GetSearchAudiobooksDocument,
	GetSearchAudiobooksQuery,
	GetSearchConferencesDocument,
	GetSearchConferencesQuery,
	GetSearchMusicTracksDocument,
	GetSearchMusicTracksQuery,
	GetSearchPersonsDocument,
	GetSearchPersonsQuery,
	GetSearchRecordingsDocument,
	GetSearchRecordingsQuery,
	GetSearchSeriesDocument,
	GetSearchSeriesQuery,
	GetSearchSponsorsDocument,
	GetSearchSponsorsQuery,
	GetSearchStoryProgramsDocument,
	GetSearchStoryProgramsQuery,
	RecordingContentType,
} from '@lib/generated/graphql';
import renderWithProviders from '@lib/test/renderWithProviders';
import Search, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/search';

import { screen, waitFor } from '@testing-library/react';
import { buildLoader } from '@lib/test/buildLoader';
import userEvent from '@testing-library/user-event';

jest.mock('next/head');

const renderPage = () => renderWithProviders(<Search />);

const empty = {
	aggregate: {
		count: 0,
	},
	nodes: [],
	pageInfo: {
		hasNextPage: false,
		endCursor: null,
	},
};

const loadRecordings = buildLoader<GetSearchRecordingsQuery>(
	GetSearchRecordingsDocument,
	{
		sermons: empty,
	}
);

const loadSeries = buildLoader<GetSearchSeriesQuery>(GetSearchSeriesDocument, {
	serieses: empty,
});

const loadConferences = buildLoader<GetSearchConferencesQuery>(
	GetSearchConferencesDocument,
	{
		conferences: empty,
	}
);

const loadSponsors = buildLoader<GetSearchSponsorsQuery>(
	GetSearchSponsorsDocument,
	{
		sponsors: empty,
	}
);

const loadPersons = buildLoader<GetSearchPersonsQuery>(
	GetSearchPersonsDocument,
	{
		persons: empty,
	}
);

const loadAudiobooks = buildLoader<GetSearchAudiobooksQuery>(
	GetSearchAudiobooksDocument,
	{
		audiobooks: empty,
	}
);

const loadMusicTracks = buildLoader<GetSearchMusicTracksQuery>(
	GetSearchMusicTracksDocument,
	{
		musicTracks: empty,
	}
);

const loadStoryPrograms = buildLoader<GetSearchStoryProgramsQuery>(
	GetSearchStoryProgramsDocument,
	{
		storyPrograms: empty,
	}
);

describe('search', () => {
	beforeEach(() => {
		__loadQuery({
			q: 'test',
		});
		loadRecordings();
		loadSeries();
		loadConferences();
		loadSponsors();
		loadPersons();
		loadAudiobooks();
		loadMusicTracks();
		loadStoryPrograms();

		// IntersectionObserver isn't available in test environment
		const mockIntersectionObserver = jest.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
	});

	it('registers search paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/search');
	});

	it('includes props', async () => {
		const { props } = (await getStaticProps({
			params: {
				language: 'en',
			},
		})) as any;

		expect(props).toBeDefined();
	});

	it('includes search term in title', async () => {
		await renderPage();

		await waitFor(() => {
			expect(screen.getByTestId('head')).toHaveTextContent(
				'Search | "test" | AudioVerse'
			);
		});
	});

	it('filters to presenters', async () => {
		loadRecordings({
			sermons: {
				aggregate: {
					count: 1,
				},
				nodes: [
					{
						__typename: 'Recording',
						id: 'recording',
						title: 'the_recording_title',
						recordingContentType: RecordingContentType.Sermon,
						persons: [],
						canonicalPath: '/en/recordings/recording',
					},
				],
			},
		});

		await renderPage();

		await screen.findByText('the_recording_title');

		userEvent.click(screen.getByRole('button', { name: 'Presenters' }));

		expect(screen.queryByText('the_recording_title')).not.toBeInTheDocument();
	});

	it('does not show empty sections on all tab', async () => {
		await renderPage();

		expect(
			screen.queryByRole('heading', {
				name: 'Presenters',
			})
		).not.toBeInTheDocument();
	});

	it('shows teachings on teachings tab', async () => {
		loadRecordings({
			sermons: {
				aggregate: {
					count: 1,
				},
				nodes: [
					{
						__typename: 'Recording',
						id: 'recording',
						title: 'the_recording_title',
						recordingContentType: RecordingContentType.Sermon,
						persons: [],
						canonicalPath: '/en/recordings/recording',
					},
				],
			},
		});

		await renderPage();

		userEvent.click(screen.getByRole('button', { name: 'Teachings' }));

		await screen.findByText('the_recording_title');
	});
});
