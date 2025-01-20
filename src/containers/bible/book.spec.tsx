import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __loadRouter } from 'next/router';
import React from 'react';
import videojs from 'video.js';

import AndMiniplayer from '~components/templates/andMiniplayer';
import AndPlaybackContext from '~components/templates/andPlaybackContext';
import { BookProps } from '~containers/bible/book';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import setPlayerMock from '~lib/test/setPlayerMock';
import Book, {
	getStaticProps,
} from '~pages/[language]/bibles/[version]/[book]/[chapter]';
import getAnyBible from '~src/services/bibles/getAnyBible';
import { getBibleBookChapters } from '~src/services/bibles/getBibleBookChapters';
import { IBibleBookChapter } from '~src/services/bibles/types';

jest.mock('~services/bibles/getFcbhBibles');
jest.mock('~services/bibles/getBibleBookChapters');
jest.mock('~services/bibles/getAnyBible');
jest.mock('video.js');
jest.mock('p-timeout');

const renderPage = buildStaticRenderer((props: BookProps) => {
	return (
		<AndPlaybackContext>
			<AndMiniplayer>
				<Book {...props} />
			</AndMiniplayer>
		</AndPlaybackContext>
	);
}, getStaticProps);

function loadPageData() {
	jest.mocked(getAnyBible).mockResolvedValue({
		id: 'the_version_id',
		title: 'the_version_title',
		description: 'the_version_description',
		sponsor: {
			title: 'the_sponsor_name',
			website: 'the_sponsor_url',
		},
		sequences: {
			nodes: [
				{
					id: 'the_sequence_id',
					title: 'the_book_shortname',
					recordings: {
						nodes: [
							{
								id: 'the_recording_id',
								title: 'the_chapter_title',
								canonicalPath: 'the_recording_path',
								description: null,
								recordingDate: null,
								sequenceIndex: null,
								canonicalUrl: '',
								copyrightYear: null,
								contentType: 'AUDIOBOOK_TRACK',
								duration: 0,
								isDownloadAllowed: false,
								shareUrl: '',
								recordingContentType: 'AUDIOBOOK_TRACK',
								collection: null,
								writers: [],
								attachments: [],
								imageWithFallback: {
									__typename: undefined,
									url: '',
								},
								recordingTags: {
									__typename: undefined,
									nodes: null,
								},
								sponsor: null,
								sequence: null,
								transcript: null,
								sequencePreviousRecording: null,
								sequenceNextRecording: null,
								distributionAgreement: null,
								speakers: [],
								audioFiles: [
									{
										url: 'sample.mp3',
										filesize: '',
										mimeType: '',
										duration: 0,
									},
								],
								videoFiles: [],
								videoStreams: [],
								videoDownloads: [],
								audioDownloads: [],
							},
						],
					},
				},
			],
		},
	});

	jest.mocked(getBibleBookChapters).mockResolvedValue([
		{
			id: 'GEN/1',
			duration: 123,
			number: 1,
			title: 'the_chapter_title',
			url: 'https://example.com',
		},
	] as IBibleBookChapter[]);
}

describe('Bible book detail page', () => {
	let scrollToProto: any;

	beforeAll(() => {
		scrollToProto = Element.prototype.scrollTo;
		Element.prototype.scrollTo = () => void 0;
	});

	afterAll(() => {
		Element.prototype.scrollTo = scrollToProto;
	});

	beforeEach(() => {
		setPlayerMock();

		__loadRouter({
			asPath: '/en/bibles/ENGESVC/Gen/1',
			query: {
				id: 'the_version_id',
				book: 'the_book_shortname',
				chapter: '1',
			},
		});

		window.fetch = jest.fn().mockReturnValueOnce({
			catch: () => undefined,
		});
	});

	it('renders', async () => {
		loadPageData();

		await renderPage();
	});

	it('displays chapter title', async () => {
		loadPageData();

		const { getAllByText } = await renderPage();

		expect(getAllByText('the_chapter_title')[0]).toBeInTheDocument();
	});

	it('displays version abbreviation', async () => {
		loadPageData();

		const { getAllByText } = await renderPage();

		expect(getAllByText('KJV Bible')[0]).toBeInTheDocument();
	});

	it('displays sponsor name', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_name')).toBeInTheDocument();
	});

	it('displays sponsor url', async () => {
		loadPageData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_name')).toHaveAttribute(
			'href',
			'the_sponsor_url',
		);
	});

	it('includes player', async () => {
		loadPageData();

		const { getAllByLabelText } = await renderPage();

		await userEvent.click(getAllByLabelText('play')[0]);

		await waitFor(() => expect(videojs).toBeCalled());
	});
});
