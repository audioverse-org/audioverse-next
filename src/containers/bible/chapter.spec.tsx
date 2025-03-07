import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __loadRouter } from 'next/router';
import React from 'react';
import videojs from 'video.js';

import AndMiniplayer from '~components/templates/andMiniplayer';
import AndPlaybackContext from '~components/templates/andPlaybackContext';
import { ChapterProps } from '~containers/bible/chapter';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import setPlayerMock from '~lib/test/setPlayerMock';
import Chapter, {
	getStaticProps,
} from '~pages/[language]/bibles/[version]/[book]/[chapter]';
import {
	CollectionContentType,
	RecordingContentType,
} from '~src/__generated__/graphql';
import getBible from '~src/services/bibles/getBible';
import getChapter from '~src/services/bibles/getChapter';
import getChapters from '~src/services/bibles/getChapters';
import getVersions from '~src/services/bibles/getVersions';

jest.mock('~services/bibles/fcbh/fetchFcbhChapters');
jest.mock('~services/bibles/fcbh/getFcbhBible');
jest.mock('~services/bibles/fcbh/getFcbhBibles');
jest.mock('~services/bibles/getBible');
jest.mock('~services/bibles/getChapter');
jest.mock('~services/bibles/getChapters');
jest.mock('~services/bibles/getVersions');
jest.mock('~services/bibles/graphql/getGraphqlVersionIndex');
jest.mock('p-timeout');
jest.mock('video.js');

const renderPage = buildStaticRenderer((props: ChapterProps) => {
	return (
		<AndPlaybackContext>
			<AndMiniplayer>
				<Chapter {...props} />
			</AndMiniplayer>
		</AndPlaybackContext>
	);
}, getStaticProps);

describe('Bible chapter detail page', () => {
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
				version: 'the_version_id',
				book: 'the_book_name',
				chapter: '1',
			},
		});

		window.fetch = jest.fn().mockReturnValueOnce({
			catch: () => undefined,
		});

		jest.mocked(getVersions).mockResolvedValue([
			{
				__typename: 'Collection',
				id: 'ENGKJV',
				title: 'King James Version',
			},
		]);

		jest.mocked(getBible).mockResolvedValue({
			id: 'ENGKJV',
			title: 'King James Version',
			description: 'The Bible in English',
			sponsor: {
				title: 'Faith Comes By Hearing',
				website: 'the_sponsor_url',
			},
			sequences: { nodes: [] },
		});

		jest.mocked(getChapter).mockResolvedValue({
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

		jest.mocked(getChapters).mockResolvedValue([
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

	it('displays book title', async () => {
		const { getByText } = await renderPage();

		expect(getByText('the_book_name')).toBeInTheDocument();
	});

	it('displays version title', async () => {
		const { getByRole } = await renderPage();

		const versionButton = getByRole('button', { name: /KJV/ });
		expect(versionButton).toBeInTheDocument();
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
