import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CardPersonFragment } from '~components/molecules/card/__generated__/person';
import { CardRecordingFragment } from '~components/molecules/card/__generated__/recording';
import {
	GetSearchAudiobooksDocument,
	GetSearchRecordingsDocument,
} from '~components/organisms/__generated__/searchResults';
import { fetchApi } from '~lib/api/fetchApi';
import { SequenceContentType } from '~src/__generated__/graphql';
import {
	buildGetSearchPersonsLoader,
	buildGetSearchRecordingsLoader,
	buildGetSearchSeriesLoader,
} from '~src/__generated__/loaders';

import { buildRenderer } from '../../lib/test/buildRenderer';
import { CardSequenceFragment } from '../molecules/card/__generated__/sequence';
import AndNavigation from './andNavigation';

const renderTemplate = buildRenderer(AndNavigation);

const teaching: CardRecordingFragment = {
	__typename: 'Recording',
	title: 'the_teaching_title',
	canonicalPath: '',
	sequenceIndex: null,
	id: '',
	duration: 0,
	recordingContentType: 'AUDIOBOOK_TRACK',
	sequence: null,
	sponsor: null,
	persons: [],
	collection: null,
	audioFiles: [],
	videoFiles: [],
	videoStreams: [],
};

const person: CardPersonFragment = {
	__typename: 'Person',
	name: 'the_person_title',
	recordings: {
		aggregate: {
			count: 0,
		},
	},
	id: '',
	canonicalPath: '',
	image: null,
};

const series: CardSequenceFragment = {
	__typename: 'Sequence',
	title: 'the_series_title',
	canonicalPath: '',
	id: '',
	contentType: SequenceContentType.Series,
	duration: 0,
	summary: '',
	speakers: {
		nodes: [],
	},
	sequenceWriters: {
		nodes: [],
	},
	allRecordings: {
		aggregate: {
			count: 0,
		},
		nodes: [],
	},
	collection: null,
};

const loadTeachings = buildGetSearchRecordingsLoader({
	sermons: {
		aggregate: {
			count: 1,
		},
		nodes: [teaching],
		pageInfo: {
			hasNextPage: false,
			endCursor: null,
		},
	},
});

const loadPresenters = buildGetSearchPersonsLoader({
	persons: {
		aggregate: {
			count: 1,
		},
		nodes: [person],
		pageInfo: {
			hasNextPage: false,
			endCursor: null,
		},
	},
});

const loadSeries = buildGetSearchSeriesLoader({
	serieses: {
		aggregate: {
			count: 1,
		},
		nodes: [series],
		pageInfo: {
			hasNextPage: false,
			endCursor: null,
		},
	},
});

describe('AndNavigation', () => {
	beforeEach(() => {
		loadTeachings();
		loadPresenters();
		loadSeries();
	});

	it('hoists teachings on exact match', async () => {
		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await userEvent.type(search, 'the_teaching_title');

		const teachingsHeading = await screen.findByRole('heading', {
			name: 'Teachings',
		});
		const presentersHeading = await screen.findByRole('heading', {
			name: 'Presenters',
		});

		expect(teachingsHeading).toAppearBefore(presentersHeading);
	});

	it('ignores case when hoisting teachings', async () => {
		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await userEvent.type(search, 'The_Teaching_Title');

		const teachingsHeading = await screen.findByRole('heading', {
			name: 'Teachings',
		});
		const presentersHeading = await screen.findByRole('heading', {
			name: 'Presenters',
		});

		expect(teachingsHeading).toAppearBefore(presentersHeading);
	});

	it('ignores punctuation when hoisting teachings', async () => {
		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await userEvent.type(search, 'the_teaching_title!');

		const teachingsHeading = await screen.findByRole('heading', {
			name: 'Teachings',
		});
		const presentersHeading = await screen.findByRole('heading', {
			name: 'Presenters',
		});

		expect(teachingsHeading).toAppearBefore(presentersHeading);
	});

	it('debounces search queries', async () => {
		const user = userEvent.setup();

		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await user.type(search, 'abc');

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(
				GetSearchRecordingsDocument,
				expect.objectContaining({
					variables: expect.objectContaining({
						term: 'abc',
					}),
				})
			);
		});

		expect(fetchApi).not.toBeCalledWith(
			GetSearchRecordingsDocument,
			expect.objectContaining({
				variables: expect.objectContaining({
					term: 'ab',
				}),
			})
		);
	});

	it('disables queries for inactive tabs', async () => {
		const user = userEvent.setup();

		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await user.type(search, 'a');

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(
				GetSearchRecordingsDocument,
				expect.objectContaining({
					variables: expect.objectContaining({
						term: 'a',
					}),
				})
			);
		});

		const tabs = await screen.findAllByRole('button', {
			name: 'Audiobooks',
		});

		user.click(tabs[0]);

		await user.type(search, 'b');

		await waitFor(() => {
			expect(fetchApi).toBeCalledWith(
				GetSearchAudiobooksDocument,
				expect.objectContaining({
					variables: expect.objectContaining({
						term: 'ab',
					}),
				})
			);
		});

		expect(fetchApi).not.toBeCalledWith(
			GetSearchRecordingsDocument,
			expect.objectContaining({
				variables: expect.objectContaining({
					term: 'ab',
				}),
			})
		);
	});

	it('hoists series on exact match', async () => {
		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await userEvent.type(search, 'the_series_title');

		const seriesHeading = (
			await screen.findAllByRole('heading', {
				name: 'Series',
			})
		)[0];
		const presentersHeading = await screen.findByRole('heading', {
			name: 'Presenters',
		});

		expect(seriesHeading).toAppearBefore(presentersHeading);
	});

	it('only checks first three entities in section when hoisting', async () => {
		loadTeachings({
			sermons: {
				aggregate: {
					count: 4,
				},
				nodes: [
					{ ...teaching, id: '1' },
					{ ...teaching, id: '2' },
					{ ...teaching, id: '3' },
					{
						...teaching,
						id: '4',
						title: 'the_teaching_title_2',
					},
				],
				pageInfo: {
					hasNextPage: false,
					endCursor: null,
				},
			},
		});

		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await userEvent.type(search, 'the_teaching_title_2');

		const teachingsHeading = await screen.findByRole('heading', {
			name: 'Teachings',
		});
		const presentersHeading = await screen.findByRole('heading', {
			name: 'Presenters',
		});

		expect(presentersHeading).toAppearBefore(teachingsHeading);
	});
});
