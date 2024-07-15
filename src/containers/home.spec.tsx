import { waitFor } from '@testing-library/react';
import { __loadQuery } from 'next/router';

import { fetchApi } from '~lib/api/fetchApi';
import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import Home, { getStaticPaths, getStaticProps } from '~pages/[language]';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';

import {
	GetHomeStaticPropsDocument,
	GetHomeStaticPropsQuery,
} from './__generated__/home';

jest.mock('next/router');

const renderPage = buildStaticRenderer(Home, getStaticProps);

const audiobookTrack = {
	title: 'the_audiobook_track_title',
	canonicalPath: 'the_audiobook_track_path',
	recordingContentType: RecordingContentType.AudiobookTrack,
	persons: [
		{
			id: 'the_audiobook_track_person_id',
			canonicalPath: 'the_person_path',
			name: 'the_audiobook_track_person_name',
			imageWithFallback: { url: 'the_audiobook_track_image_path' },
		},
	],
	writers: [],
	duration: 22 * 60,
	sequence: {
		id: 'the_audiobook_track_collection_id',
		canonicalPath: 'the_sequence_path',
		title: 'the_audiobook_track_collection_title',
		contentType: SequenceContentType.Audiobook,
		recordings: {
			aggregate: {
				count: 7,
			},
			nodes: [],
		},
		favoritedRecordings: {
			aggregate: {
				count: 0,
			},
		},
	},
};

const song = {
	title: 'the_song_title',
	canonicalPath: 'the_song_path',
	recordingContentType: RecordingContentType.MusicTrack,
	persons: [
		{
			id: 'the_song_person_id',
			canonicalPath: 'the_person_path',
			name: 'the_song_person_name',
			imageWithFallback: { url: 'the_song_image_path' },
		},
	],
	duration: 5 * 60,
	sequence: {
		id: 'the_song_collection_id',
		title: 'the_song_collection_title',
		canonicalPath: 'the_sequence_path',
		contentType: SequenceContentType.MusicAlbum,
		recordings: {
			aggregate: {
				count: 7,
			},
			nodes: [],
		},
		favoritedRecordings: {
			aggregate: {
				count: 0,
			},
		},
	},
};

const story = {
	title: 'the_story_title',
	canonicalPath: 'the_story_path',
	recordingContentType: RecordingContentType.Story,
	duration: 21 * 60,
	persons: [
		{
			id: 'the_story_person_id',
			canonicalPath: 'the_person_path',
			name: 'the_story_person_name',
			imageWithFallback: { url: 'the_story_person_image_path' },
		},
	],
	sequenceIndex: 1,
	sequence: {
		title: 'the_story_sequence_title',
		canonicalPath: 'the_sequence_path',
		contentType: SequenceContentType.StorySeason,
		recordings: {
			aggregate: {
				count: 7,
			},
			nodes: [],
		},
		favoritedRecordings: {
			aggregate: {
				count: 0,
			},
		},
	},
	sponsor: {
		title: '',
		imageWithFallback: { url: '' },
		canonicalPath: '',
	},
};

const recording = {
	title: 'the_recording_title',
	canonicalPath: 'the_recording_path',
	recordingContentType: RecordingContentType.Sermon,
	persons: [
		{
			id: 'the_recording_person_id',
			canonicalPath: 'the_person_path',
			name: 'the_recording_person_name',
			imageWithFallback: { url: 'the_recording_person_path' },
		},
	],
	duration: 33 * 60,
	sequenceIndex: 1,
	sequence: {
		title: 'the_recording_sequence_title',
		canonicalPath: 'the_sequence_path',
		contentType: SequenceContentType.Series,
		recordings: {
			aggregate: {
				count: 15,
			},
			nodes: [],
		},
		favoritedRecordings: {
			aggregate: {
				count: 0,
			},
		},
	},
};

const testimony = {
	id: 'the_testimony_id',
	body: 'the_testimony_body',
};

const post = {
	image: {
		url: 'the_post_image_url',
	},
	publishDate: '2019-12-03T09:54:33Z',
	title: 'the_post_title',
	teaser: 'the_post_teaser',
	canonicalPath: 'the_post_path',
	readingDuration: 9 * 60,
};

const loadData = buildLoader<GetHomeStaticPropsQuery>(
	GetHomeStaticPropsDocument,
	{
		websiteRecentRecordings: {
			nodes: [audiobookTrack, recording, song, story],
		},
		testimonies: {
			nodes: [testimony],
		},
		blogPosts: {
			nodes: [post],
		},
		bibleChapters: {
			nodes: [
				{
					title: 'Genesis',
					collection: {
						title: 'King James Version',
					},
					canonicalPath: 'the_sequence_path',
					contentType: SequenceContentType.BibleBook,
					speakers: {
						nodes: [],
					},
					allRecordings: {
						nodes: [
							{
								canonicalPath: 'the_canonical_path',
							},
						],
					},
				},
			],
		},
	}
);

describe('home page', () => {
	beforeEach(() => {
		loadData();
	});

	it('revalidates static copy frequently', async () => {
		const { revalidate } = (await getStaticProps({
			params: { language: 'en' },
		})) as any;

		expect(revalidate).toBe(14400);
	});

	it('generates static paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en');
	});

	it('sets proper fallback strategy', async () => {
		const { fallback } = await getStaticPaths();

		expect(fallback).toBe(false);
	});

	it('generates static paths for all languages', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/es');
	});

	it('queries with language', async () => {
		__loadQuery({ language: 'es' });

		await renderPage();

		await waitFor(() =>
			expect(fetchApi).toBeCalledWith(GetHomeStaticPropsDocument, {
				variables: {
					language: 'SPANISH',
				},
			})
		);
	});

	it('includes testimonies', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Testimonials')).toBeInTheDocument();
	});

	it('falls back to English', async () => {
		__loadQuery({ language: 'ak' });

		const { getByText } = await renderPage();

		expect(getByText('Testimonials')).toBeInTheDocument();
	});

	it('renders song title', async () => {
		const { getByText } = await renderPage();

		await waitFor(() => {
			expect(getByText('the_song_title')).toBeInTheDocument();
		});
	});

	it('renders song person', async () => {
		const { getByText } = await renderPage();

		expect(getByText('the_song_person_name')).toBeInTheDocument();
	});

	it('renders song duration', async () => {
		const { getByText } = await renderPage();

		expect(getByText('5m')).toBeInTheDocument();
	});

	it('renders song collection title', async () => {
		const { getAllByText } = await renderPage();

		expect(getAllByText('the_song_collection_title')[1]).toBeInTheDocument();
	});

	it('renders Bible book title', async () => {
		const { getByText } = await renderPage();

		expect(getByText('King James Version')).toBeInTheDocument();
	});

	it('renders story title', async () => {
		const { getByText } = await renderPage();

		expect(getByText('the_story_title')).toBeInTheDocument();
	});

	it('renders story duration', async () => {
		const { getByText } = await renderPage();

		expect(getByText('21m')).toBeInTheDocument();
	});

	it('renders recording title', async () => {
		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('renders post titles', async () => {
		const { getByText } = await renderPage();

		expect(getByText('the_post_title')).toBeInTheDocument();
	});

	it('renders post date', async () => {
		const { getByText } = await renderPage();

		expect(getByText('December 3, 2019')).toBeInTheDocument();
	});

	it('renders post teaser', async () => {
		const { getByText } = await renderPage();

		expect(getByText('the_post_teaser')).toBeInTheDocument();
	});

	it('renders read time', async () => {
		const { getByText } = await renderPage();

		expect(getByText('9m read')).toBeInTheDocument();
	});

	it('renders post image', async () => {
		const { getByAltText } = await renderPage();

		expect(getByAltText('the_post_title')).toHaveAttribute(
			'src',
			'the_post_image_url'
		);
	});

	it('links post title', async () => {
		const { getByText } = await renderPage();

		expect(
			getByText('the_post_title').parentElement?.parentElement
		).toHaveAttribute('href', 'the_post_path');
	});
});

// TODO:
// render Bible chapter duration
// render Bible chapter progress
// render Bible chapter container title (book and version)
// render song progress
// shows marketing header
// includes language switcher
// includes login and signup links
// language switcher opens
// language switcher closes
// localize all text
// displays 404 on getStaticProps fetch errors
