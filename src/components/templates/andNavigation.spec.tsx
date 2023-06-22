import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CardPersonFragment } from '~components/molecules/card/__generated__/person';
import { CardRecordingFragment } from '~components/molecules/card/__generated__/recording';
import {
	GetSearchPersonsDocument,
	GetSearchRecordingsDocument,
} from '~components/organisms/__generated__/searchResults';

import { buildLoader } from '../../lib/test/buildLoader';
import { buildRenderer } from '../../lib/test/buildRenderer';
import AndNavigation from './andNavigation';

const renderTemplate = buildRenderer(AndNavigation);

const teaching: CardRecordingFragment = {
	__typename: 'Recording',
	title: 'test',
	canonicalPath: '',
	sequenceIndex: null,
	id: '',
	duration: 0,
	recordingContentType: 'AUDIOBOOK_TRACK',
	sequence: null,
	writers: [],
	sponsor: null,
	persons: [],
	collection: null,
	audioFiles: [],
	videoFiles: [],
	videoStreams: [],
};

const person: CardPersonFragment = {
	__typename: 'Person',
	name: 'test',
	recordings: {
		aggregate: {
			count: 0,
		},
	},
	id: '',
	canonicalPath: '',
	image: null,
};

const loadTeachings = buildLoader(GetSearchRecordingsDocument, {
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
const loadPresenters = buildLoader(GetSearchPersonsDocument, {
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

describe('AndNavigation', () => {
	beforeEach(() => {
		loadTeachings();
		loadPresenters();
	});

	it('hoists teachings on exact match', async () => {
		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await userEvent.type(search, 'test');

		const teachingsHeading = await screen.findByRole('heading', {
			name: 'Teachings',
		});
		const presentersHeading = await screen.findByRole('heading', {
			name: 'Presenters',
		});

		expect(teachingsHeading.compareDocumentPosition(presentersHeading)).toBe(
			Node.DOCUMENT_POSITION_FOLLOWING
		);
	});

	it('ignores case when hoisting teachings', async () => {
		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await userEvent.type(search, 'Test');

		const teachingsHeading = await screen.findByRole('heading', {
			name: 'Teachings',
		});
		const presentersHeading = await screen.findByRole('heading', {
			name: 'Presenters',
		});

		expect(teachingsHeading.compareDocumentPosition(presentersHeading)).toBe(
			Node.DOCUMENT_POSITION_FOLLOWING
		);
	});

	it('ignores punctuation when hoisting teachings', async () => {
		await renderTemplate();

		const searchInputs = screen.getAllByPlaceholderText('Search');
		const search = searchInputs[0];

		await userEvent.type(search, 'test!');

		const teachingsHeading = await screen.findByRole('heading', {
			name: 'Teachings',
		});
		const presentersHeading = await screen.findByRole('heading', {
			name: 'Presenters',
		});

		expect(teachingsHeading.compareDocumentPosition(presentersHeading)).toBe(
			Node.DOCUMENT_POSITION_FOLLOWING
		);
	});
});
