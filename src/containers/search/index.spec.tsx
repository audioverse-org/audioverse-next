import { screen, waitFor } from '@testing-library/react';
import { __loadQuery } from 'next/router';

import { buildRenderer } from '~lib/test/buildRenderer';
import Search, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/search';
import { RecordingContentType } from '~src/__generated__/graphql';
import {
	buildGetSearchAudiobooksLoader,
	buildGetSearchConferencesLoader,
	buildGetSearchMusicTracksLoader,
	buildGetSearchPersonsLoader,
	buildGetSearchRecordingsLoader,
	buildGetSearchSeriesLoader,
	buildGetSearchSponsorsLoader,
	buildGetSearchStoryProgramsLoader,
} from '~src/__generated__/loaders';

jest.mock('next/head');

const renderPage = buildRenderer(Search, {
	defaultProps: {
		entityType: 'all',
		onEntityTypeChange: () => undefined,
	},
});

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

const loadRecordings = buildGetSearchRecordingsLoader({
	sermons: empty,
});

const loadSeries = buildGetSearchSeriesLoader({
	serieses: empty,
});

const loadConferences = buildGetSearchConferencesLoader({
	conferences: empty,
});

const loadSponsors = buildGetSearchSponsorsLoader({
	sponsors: empty,
});

const loadPersons = buildGetSearchPersonsLoader({
	persons: empty,
});

const loadAudiobooks = buildGetSearchAudiobooksLoader({
	audiobooks: empty,
});

const loadMusicTracks = buildGetSearchMusicTracksLoader({
	musicTracks: empty,
});

const loadStoryPrograms = buildGetSearchStoryProgramsLoader({
	recordings: empty,
});

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
				'Search | "test" | AudioVerse',
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
						speakers: [],
						canonicalPath: '/en/recordings/recording',
					},
				],
			},
		});

		await renderPage({
			props: {
				entityType: 'presenters',
			},
		});

		expect(screen.queryByText('the_recording_title')).not.toBeInTheDocument();
	});

	it('does not show empty sections on all tab', async () => {
		await renderPage();

		expect(
			screen.queryByRole('heading', {
				name: 'Presenters',
			}),
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
						speakers: [],
						canonicalPath: '/en/recordings/recording',
					},
				],
			},
		});

		await renderPage({
			props: {
				entityType: 'teachings',
			},
		});

		await screen.findByText('the_recording_title');
	});
});
