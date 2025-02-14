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
	getServerSideProps,
} from '~pages/[language]/bibles/[version]/[book]/[chapter]';
import {
	CollectionContentType,
	RecordingContentType,
} from '~src/__generated__/graphql';
import getAnyBible from '~src/services/bibles/getAnyBible';
import getAnyBibleBookChapter from '~src/services/bibles/getAnyBibleBookChapter';
import getAnyBibleBookChapters from '~src/services/bibles/getAnyBibleBookChapters';

jest.mock('~services/bibles/fcbh/getFcbhBibles');
jest.mock('~services/bibles/getAnyBible');
jest.mock('~services/bibles/fcbh/fetchFcbhChapters');
jest.mock('~services/bibles/getAnyBibleBookChapter');
jest.mock('~services/bibles/getAnyBibleBookChapters');
jest.mock('~services/bibles/fcbh/getFcbhBible');
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
}, getServerSideProps);

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
				book: 'the_book_name',
				chapter: '1',
			},
		});

		window.fetch = jest.fn().mockReturnValueOnce({
			catch: () => undefined,
		});

		jest.mocked(getAnyBible).mockResolvedValue({
			id: 'ENGKJV',
			title: 'King James Version',
			description: 'The Bible in English',
			sponsor: {
				title: 'Faith Comes By Hearing',
				website: 'the_sponsor_url',
			},
			sequences: { nodes: [] },
		});

		jest.mocked(getAnyBibleBookChapter).mockResolvedValue({
			id: 'GEN/1',
			title: 'the_chapter_title',
			contentType: RecordingContentType.BibleChapter,
			canonicalPath: '/en/bibles/ENGKJV/Gen/1',
			duration: 123,
			isDownloadAllowed: false,
			shareUrl: 'https://www.audioverse.org/en/bibles/ENGKJV/Gen/1',
			recordingContentType: RecordingContentType.BibleChapter,
			collection: {
				id: 'ENGKJV',
				title: 'King James Version (Dramatized)',
				contentType: CollectionContentType.BibleVersion,
			},
			speakers: [],
			sponsor: {
				title: 'Faith Comes By Hearing',
			},
			sequence: null,
			audioFiles: [
				{
					url: 'https://example.com',
					mimeType: 'audio/mpeg',
					filesize: 'unknown',
					duration: 123,
				},
			],
			videoFiles: [],
			videoStreams: [],
			transcript: {
				text: '',
			},
			videoDownloads: [],
			audioDownloads: [],
			sequencePreviousRecording: null,
			sequenceNextRecording: null,
		});

		jest.mocked(getAnyBibleBookChapters).mockResolvedValue([
			{
				id: 'GEN/1',
				title: 'the_chapter_title',
				canonicalPath: '/en/bibles/ENGKJV/Gen/1',
				duration: 123,
				sequenceIndex: null,
				recordingContentType: RecordingContentType.BibleChapter,
				sequence: null,
				speakers: [],
				sponsor: {
					title: 'Faith Comes By Hearing',
				},
				collection: {
					id: 'ENGKJV',
					title: 'King James Version',
					contentType: CollectionContentType.BibleVersion,
				},
				audioFiles: [],
				videoFiles: [],
				videoStreams: [],
			},
		]);
	});

	it('displays chapter title', async () => {
		const { getAllByText } = await renderPage();

		expect(getAllByText('the_chapter_title')[0]).toBeInTheDocument();
	});

	it('displays version abbreviation', async () => {
		const { getAllByText } = await renderPage();

		expect(getAllByText('KJV Bible')[0]).toBeInTheDocument();
	});

	it('displays sponsor name', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Faith Comes By Hearing')).toBeInTheDocument();
	});

	it('displays sponsor url', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Faith Comes By Hearing')).toHaveAttribute(
			'href',
			'the_sponsor_url',
		);
	});

	it('includes player', async () => {
		const { getAllByLabelText } = await renderPage();

		await userEvent.click(getAllByLabelText('play')[0]);

		await waitFor(() => expect(videojs).toBeCalled());
	});
});
