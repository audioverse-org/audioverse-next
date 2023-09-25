import {
	act,
	findByLabelText,
	getByLabelText,
	getByTestId,
	getByText,
	screen,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { __loadQuery, __loadRouter } from 'next/router';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import videojs from 'video.js';

import AndMiniplayer from '~components/templates/andMiniplayer';
import AndPlaybackContext from '~components/templates/andPlaybackContext';
import { SermonDetailProps } from '~containers/sermon/detail';
import { fetchApi } from '~lib/api/fetchApi';
import { DETAIL_PRERENDER_LIMIT } from '~lib/constants';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import renderWithProviders from '~lib/test/renderWithProviders';
import setPlayerMock from '~lib/test/setPlayerMock';
import SermonDetail, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/teachings/[id]/[[...slug]]';
import {
	Language,
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';

import {
	GetSermonDetailDataDocument,
	GetSermonDetailStaticPathsDocument,
} from './__generated__/detail';

jest.mock('video.js');
jest.mock('~lib/api/fetchApi');
// WORKAROUND: https://github.com/vercel/next.js/issues/16864#issuecomment-702069418

function loadSermonDetailPathsData() {
	when(fetchApi)
		.calledWith(GetSermonDetailStaticPathsDocument, expect.anything())
		.mockResolvedValue({
			sermons: {
				nodes: [
					{
						id: 'sermon_id',
						canonicalPath: '/en/teachings/sermon_id',
						recordingDate: '2020-06-01T09:30:00.000Z',
					},
					{
						id: 'sermon_id',
						canonicalPath: '/es/teachings/sermon_id',
						recordingDate: '2020-06-01T09:30:00.000Z',
					},
				],
			},
		});
}

function loadSermonDetailData(sermon: any = undefined): void {
	sermon = {
		id: 'the_sermon_id',
		title: 'the_sermon_title',
		contentType: RecordingContentType.Sermon,
		canonicalPath: 'the_canonical_path',
		language: Language.English,
		speakers: [],
		writers: [],
		audioFiles: [],
		videoFiles: [],
		attachments: [],
		audioDownloads: [],
		videoDownloads: [],
		isDownloadAllowed: true,
		imageWithFallback: { url: '' },
		...sermon,
	};

	when(fetchApi)
		.calledWith(GetSermonDetailDataDocument, expect.anything())
		.mockResolvedValue({ sermon });
}

const renderPage = buildStaticRenderer((props: SermonDetailProps) => {
	return (
		<AndPlaybackContext>
			<AndMiniplayer>
				<SermonDetail {...props} />
			</AndMiniplayer>
		</AndPlaybackContext>
	);
}, getStaticProps);

describe('sermon detail page', () => {
	beforeEach(() => {
		__loadRouter({
			isFallback: false,
			query: {
				language: 'en',
				id: 'the_sermon_id',
			},
		});
		setPlayerMock();
	});

	it('gets sermons', async () => {
		loadSermonDetailPathsData();

		await getStaticPaths();

		await waitFor(() =>
			expect(fetchApi).toBeCalledWith(GetSermonDetailStaticPathsDocument, {
				variables: {
					language: 'ENGLISH',
					first: DETAIL_PRERENDER_LIMIT,
				},
			})
		);
	});

	it('gets recent sermons in all languages', async () => {
		loadSermonDetailPathsData();

		await getStaticPaths();

		await waitFor(() =>
			expect(fetchApi).toBeCalledWith(GetSermonDetailStaticPathsDocument, {
				variables: {
					language: 'SPANISH',
					first: DETAIL_PRERENDER_LIMIT,
				},
			})
		);
	});

	it('returns paths', async () => {
		loadSermonDetailPathsData();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/teachings/sermon_id');
	});

	it('generates localized paths', async () => {
		loadSermonDetailPathsData();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/teachings/sermon_id');
	});

	it('catches API errors', async () => {
		when(fetchApi)
			.calledWith(GetSermonDetailDataDocument, expect.anything())
			.mockRejectedValue('Oops!');

		const result = (await getStaticProps({
			params: { language: 'en', id: '1' },
		})) as any;

		expect(result.notFound).toBe(true);
	});

	it('renders 404 on missing sermon', async () => {
		when(fetchApi)
			.calledWith(GetSermonDetailDataDocument, expect.anything())
			.mockRejectedValue('Oops!');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});

	it('shows loading screen', async () => {
		__loadRouter({ isFallback: true });

		const { getByLabelText } = await renderWithProviders(
			<SermonDetail recording={null} />,
			undefined
		);

		expect(getByLabelText('Loading…')).toBeInTheDocument();
	});

	it('has favorite button', async () => {
		loadSermonDetailData();

		const { getByLabelText } = await renderPage();

		expect(getByLabelText('Favorite')).toBeInTheDocument();
	});

	it('includes player', async () => {
		loadSermonDetailData({
			audioFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		});

		const { getByLabelText } = await renderPage();

		await userEvent.click(getByLabelText('play'));

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});
	});

	it('sets poster', async () => {
		loadSermonDetailData({
			audioFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		});

		const { getByLabelText } = await renderPage();

		await userEvent.click(getByLabelText('play'));

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});

		expect(videojs).toBeCalledWith(
			expect.anything(),
			expect.objectContaining({
				poster: expect.anything(),
			})
		);
	});

	it('toggles sources', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoStreams: [{ url: 'video_url', mimeType: 'video_mimetype' }],
		});

		const { getByText } = await renderPage();

		await userEvent.click(getByText('Audio'));

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});

		const calls = (videojs as any as jest.Mock).mock.calls;
		const sourceSets = calls.map((c) => c[1].sources);

		expect(sourceSets).toEqual(
			expect.arrayContaining([
				[
					{
						src: 'audio_url',
						type: 'audio_mimetype',
					},
				],
			])
		);
	});

	it('falls back to video files', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
			videoStreams: [],
		});

		const { getByAltText } = await renderPage();

		const poster = getByAltText('the_sermon_title') as HTMLElement;

		await userEvent.click(poster.parentElement as HTMLElement);

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});

		const calls = (videojs as any as jest.Mock).mock.calls;
		const sourceSets = calls.map((c) => c[1].sources);

		expect(sourceSets).toEqual(
			expect.arrayContaining([
				[
					{
						src: 'video_url',
						type: 'video_mimetype',
					},
				],
			])
		);
	});

	it('falls back to audio files', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoFiles: [],
			videoStreams: [],
		});

		const { getByLabelText } = await renderPage();

		await userEvent.click(getByLabelText('play'));

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});

		const calls = (videojs as any as jest.Mock).mock.calls;
		const sourceSets = calls.map((c) => c[1].sources);

		expect(sourceSets).toEqual(
			expect.arrayContaining([
				[
					{
						src: 'audio_url',
						type: 'audio_mimetype',
					},
				],
			])
		);
	});

	it('hides toggle if no video', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Play Audio')).not.toBeInTheDocument();
	});

	it('shows speaker name', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [
				{
					id: 'the_id',
					name: 'the_name',
					canonicalPath: 'the_path',
					imageWithFallback: {
						url: 'the_image_url',
					},
				},
			],
		});

		const { getAllByText } = await renderPage();

		expect(getAllByText('the_name').length > 0).toBeTruthy();
	});

	it('includes sponsor title', async () => {
		loadSermonDetailData({
			sponsor: {
				title: 'the_title',
				location: 'the_location',
				canonicalPath: 'the_path',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('the_title')).toBeInTheDocument();
	});

	it('includes time recorded', async () => {
		(fetchApi as jest.Mock).mockResolvedValue({});

		loadSermonDetailData({
			speakers: [
				{
					id: 'the_id',
					name: 'the_name',
					canonicalPath: 'the_path',
					imageWithFallback: {
						url: 'the_image_url',
					},
				},
			],
			recordingDate: '2023-03-01 09:30:00',
		});

		const { getByText } = await renderPage();

		expect(getByText('March 1, 2023, 9:30 AM')).toBeInTheDocument();
	});

	it('includes series title', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
				canonicalPath: 'series_path',
			},
		});

		const { getAllByText } = await renderPage();

		expect(getAllByText('series_title').length).toBeGreaterThanOrEqual(2);
	});

	it('does not include series heading if no series', async () => {
		loadSermonDetailData();

		const { queryByText } = await renderPage();

		expect(queryByText('Series')).not.toBeInTheDocument();
	});

	it('links series title', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				canonicalPath: 'series_path',
				contentType: SequenceContentType.Series,
			},
		});

		const { getAllByText } = await renderPage();

		const link = getAllByText('series_title')[0]
			.parentElement as HTMLLinkElement;

		expect(link.href).toContain('/series_path');
	});

	it('uses language base route in series link', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				canonicalPath: 'es/series_path',
				contentType: SequenceContentType.Series,
			},
			language: Language.Spanish,
		});

		__loadQuery({
			language: 'es',
		});

		const { getAllByText } = await renderPage();

		const link = getAllByText('series_title')[0]
			.parentElement as HTMLLinkElement;

		expect(link.href).toContain('/es/series_path');
	});

	it('shows copyright', async () => {
		loadSermonDetailData({
			copyrightYear: 1999,
			distributionAgreement: {
				sponsor: {
					title: 'the_sponsor',
				},
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('Copyright ⓒ1999 the_sponsor.'));
	});

	it('falls back to top-level sponsor', async () => {
		loadSermonDetailData({
			copyrightYear: 1999,
			sponsor: {
				title: 'the_sponsor',
				canonicalPath: 'the_path',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('Copyright ⓒ1999 the_sponsor.')).toBeInTheDocument();
	});

	it('displays license summary', async () => {
		loadSermonDetailData({
			distributionAgreement: {
				license: {
					summary: 'the_license_summary',
				},
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('the_license_summary')).toBeInTheDocument();
	});

	it('does not display missing copyright image', async () => {
		loadSermonDetailData();

		const { queryByAltText } = await renderPage();

		expect(queryByAltText('copyright')).not.toBeInTheDocument();
	});

	it('links video downloads', async () => {
		loadSermonDetailData({
			videoDownloads: [
				{
					id: 'the_video_id',
					url: 'the_url',
					filesize: '1073741824',
				},
			],
		});

		const { getByText } = await renderPage();

		const link = getByText('High Quality (1 GB)') as HTMLLinkElement;

		expect(link.href).toContain('the_url');
	});

	it('links audio downloads', async () => {
		loadSermonDetailData({
			audioDownloads: [
				{
					id: 'the_audio_id',
					url: 'the_url',
					filesize: '1073741824',
				},
			],
		});

		const { getByText } = await renderPage();

		const link = getByText('High Quality (1 GB)') as HTMLLinkElement;

		expect(link.href).toContain('the_url');
	});

	it('displays recordings in series', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
				canonicalPath: 'the_path',
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							canonicalPath: 'sibling_path',
							persons: [],
						},
					],
				},
			},
		});

		const { getByText } = await renderPage();

		await waitFor(() =>
			expect(fetchApi).toBeCalledWith(
				GetSermonDetailDataDocument,
				expect.anything()
			)
		);

		expect(getByText('sibling_title')).toBeInTheDocument();
	});

	it('includes transcripts', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		await userEvent.click(screen.getByText('Read Transcript'));

		expect(await screen.findByText('the_transcript_text')).toBeInTheDocument();
	});

	it('notes probable auto generation', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		await userEvent.click(screen.getByText('Read Transcript'));

		expect(
			await screen.findByText('This transcript may be automatically generated.')
		).toBeInTheDocument();
	});

	it('includes transcript assistance request', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		await userEvent.click(screen.getByText('Read Transcript'));

		const needle =
			'Our auto-generated transcripts need your help. Feel free to e-mail us your edited text of this transcript for your benefit and others. media@audioverse.org';

		expect(await screen.findByText(needle)).toBeInTheDocument();
	});

	it('does not include transcript section if no transcript', async () => {
		loadSermonDetailData({
			transcript: {
				text: '',
			},
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Transcript')).not.toBeInTheDocument();
	});

	it('includes share url', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		const { getByText, getByLabelText } = await renderPage();

		await userEvent.click(getByLabelText('share'));

		expect((getByText('Copy Link') as HTMLAnchorElement).href).toContain(
			'the_share_url'
		);
	});

	it('includes share url title', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		const { getByText, getByLabelText } = await renderPage();

		await userEvent.click(getByLabelText('share'));

		expect(getByText('Copy Link')).toBeInTheDocument();
	});

	it('includes share title', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		const { getByText, getByLabelText } = await renderPage();

		await userEvent.click(getByLabelText('share'));

		expect(getByText('Share')).toBeInTheDocument();
	});

	it('has embed input', async () => {
		loadSermonDetailData();

		const { getByLabelText, getByText } = await renderPage();

		await userEvent.click(getByLabelText('share'));

		expect(getByText('Audio Embed Code')).toBeInTheDocument();
	});

	it('populates embed input', async () => {
		loadSermonDetailData();

		const { getByLabelText, getByText } = await renderPage();

		await userEvent.click(getByLabelText('share'));

		const input = getByText('Audio Embed Code').nextSibling as HTMLInputElement;

		expect(input.value).toContain(
			'https://www.audioverse.org/english/embed/media/the_sermon_id'
		);
	});

	it('renders 404 on fetch error', async () => {
		when(fetchApi)
			.calledWith(GetSermonDetailDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});

	it('renders part number', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
				canonicalPath: 'series_path',
			},
			sequenceIndex: 1,
		});

		const { getByText } = await renderPage();

		expect(getByText('Part 1')).toBeInTheDocument();
	});

	it('links to previous recording', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
				canonicalPath: 'series_path',
			},
			sequenceIndex: 2,
			sequencePreviousRecording: {
				id: 1,
				canonicalPath: '/en/teachings/1',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('Previous')).toHaveAttribute('href', '/en/teachings/1');
	});

	it('links to next recording', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
				canonicalPath: 'the_series_path',
			},
			sequenceIndex: 2,
			sequenceNextRecording: {
				id: 3,
				canonicalPath: '/en/teachings/3',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('Next')).toHaveAttribute('href', '/en/teachings/3');
	});

	it('links sponsor title', async () => {
		loadSermonDetailData({
			sponsor: {
				id: 'sponsor_id',
				title: 'sponsor_title',
				canonicalPath: '/sponsor_path',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('sponsor_title')).toHaveAttribute('href', '/sponsor_path');
	});

	it('sets head title', async () => {
		loadSermonDetailData();

		const result = (await getStaticProps({
			params: { language: 'en', id: 'the_id' },
		})) as any;

		expect(result.props.title).toEqual('the_sermon_title');
	});

	it('sets paused to true when switching formats', async () => {
		loadSermonDetailData({
			id: 'another_id',
			audioFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
			videoFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		});

		const result = await renderPage();

		const player = result.getByLabelText('player');

		await userEvent.click(result.getByText('Audio'));
		await findByLabelText(player, 'play');
		await userEvent.click(getByLabelText(player, 'play'));
		await userEvent.click(result.getByText('Video'));
		await userEvent.click(result.getByText('Audio'));
		await findByLabelText(player, 'play');
		expect(getByLabelText(player, 'play')).toBeInTheDocument();
	});

	it('displays both format buttons at the same time', async () => {
		loadSermonDetailData({
			audioFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
			videoFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		});

		const { getByText } = await renderPage();

		expect(getByText('Audio')).toBeInTheDocument();
		expect(getByText('Video')).toBeInTheDocument();
	});

	it('marks video format as pressed', async () => {
		loadSermonDetailData({
			audioFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
			videoFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		});

		const { getByText } = await renderPage();

		expect(getByText('Video')).toHaveAttribute('aria-pressed', 'true');
	});

	it('marks audio format as pressed', async () => {
		loadSermonDetailData({
			audioFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
			videoFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		});

		await renderPage();

		await userEvent.click(screen.getByText('Audio'));

		await waitFor(() => {
			expect(screen.getByText('Audio')).toHaveAttribute('aria-pressed', 'true');
		});

		await waitFor(() => expect(videojs).toBeCalled());
	});

	it('does not mark audio pressed when video selected', async () => {
		loadSermonDetailData({
			audioFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
			videoFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		});

		const { getByText } = await renderPage();

		expect(getByText('Audio')).toHaveAttribute('aria-pressed', 'false');
	});

	it('only displays time once when viewing audio for video', async () => {
		loadSermonDetailData({
			duration: 60,
			audioFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
			videoFiles: [
				{
					url: 'the_source_src',
					mimeType: 'the_source_type',
					filesize: 'the_source_size',
				},
			],
		});

		const result = await renderPage();

		await userEvent.click(result.getByText('Audio'));

		const player = result.getByLabelText('player');

		expect(getByText(player, '0:00')).toBeInTheDocument();

		await waitFor(() => expect(videojs).toBeCalled());
	});

	it('hides transcript', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		const { queryByText } = await renderPage();

		expect(queryByText('the_transcript_text')).not.toBeInTheDocument();
	});

	it('uses hide verb for button', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		await userEvent.click(screen.getByText('Read Transcript'));

		expect(await screen.findByText('Hide Transcript')).toBeInTheDocument();
	});

	it('displays play buttons for sequence recordings', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
				canonicalPath: 'the_sequence_path',
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							canonicalPath: 'sibling_path',
							persons: [],
						},
					],
				},
			},
		});

		const result = await renderPage();

		const sidebar = result.getByLabelText('series list');

		expect(getByLabelText(sidebar, 'play')).toBeInTheDocument();
	});

	it('loads series video into miniplayer on first click', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
				canonicalPath: 'the_series_path',
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							canonicalPath: 'sibling_path',
							videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
							persons: [],
						},
					],
				},
			},
		});

		await renderPage();

		const sidebar = screen.getByLabelText('series list');

		await userEvent.click(getByLabelText(sidebar, 'play'));

		const miniplayer = await screen.findByLabelText('miniplayer');

		await waitFor(() => {
			expect(getByTestId(miniplayer, 'video-element')).toBeInTheDocument();
		});

		await waitFor(() => expect(videojs).toBeCalled());
	});

	it('loads series video into miniplayer after loading detail video into portal', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
				canonicalPath: 'the_series_path',
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							canonicalPath: 'sibling_path',
							videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
							persons: [],
						},
					],
				},
			},
		});

		await renderPage();

		const player = screen.getByLabelText('player');

		await userEvent.click(getByLabelText(player, 'play'));

		const sidebar = screen.getByLabelText('series list');

		await userEvent.click(getByLabelText(sidebar, 'play'));

		const miniplayer = await screen.findByLabelText('miniplayer');

		await waitFor(() => {
			expect(getByTestId(miniplayer, 'video-element')).toBeInTheDocument();
		});

		await waitFor(() => expect(videojs).toBeCalled());
	});

	it('starts at beginning when playing series recording', async () => {
		const mockPlayer = setPlayerMock();

		loadSermonDetailData({
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			sequence: {
				contentType: SequenceContentType.Series,
				canonicalPath: 'the_sequence_path',
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							canonicalPath: 'sibling_path',
							videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
							persons: [],
						},
					],
				},
			},
		});

		const result = await renderPage();
		const player = result.getByLabelText('player');

		await userEvent.click(getByLabelText(player, 'play'));

		await waitFor(() => {
			expect(getByLabelText(player, 'pause')).toBeInTheDocument();
		});

		const miniplayer = result.getByLabelText('miniplayer');

		mockPlayer.currentTime(50);

		await act(async () => {
			ReactTestUtils.Simulate.timeUpdate(
				result.getByTestId('video-element'),
				{} as any
			);
		});

		await waitFor(() => {
			expect(getByText(player, '0:50')).toBeInTheDocument();
		});

		const sidebar = result.getByLabelText('series list');

		await userEvent.click(getByLabelText(sidebar, 'play'));

		expect(mockPlayer.currentTime).toBeCalledWith(0);

		await waitFor(() => {
			expect(getByLabelText(miniplayer, 'progress')).toHaveValue('0');
		});
	});

	// it('displays progress bar for sequence recordings', async () => {
	// 	loadSermonDetailData({
	// 		sequence: {
	// 			recordings: {
	// 				nodes: [
	// 					{
	// 						id: 'the_sibling_id',
	// 						title: 'sibling_title',
	// 						canonicalPath: 'sibling_path',
	// 					},
	// 				],
	// 			},
	// 		},
	// 	});

	// 	const result = await renderPage();

	// 	const sidebar = result.getByLabelText('series list');

	// 	expect(getByLabelText(sidebar, 'progress')).toBeInTheDocument();
	// });

	// it('disables sidebar progress bar interactivity', async () => {
	// 	loadSermonDetailData({
	// 		sequence: {
	// 			recordings: {
	// 				nodes: [
	// 					{
	// 						id: 'the_sibling_id',
	// 						title: 'sibling_title',
	// 						canonicalPath: 'sibling_path',
	// 					},
	// 				],
	// 			},
	// 		},
	// 	});

	// 	const result = await renderPage();

	// 	const sidebar = result.getByLabelText('series list');

	// 	expect(getByLabelText(sidebar, 'progress')).toBeDisabled();
	// });
	// TODO: reimplement when usePlaybackSession uses server-side progress

	it('displays durations in sidebar', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
				canonicalPath: 'series_path',
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							canonicalPath: 'sibling_path',
							duration: 60 * 5,
							persons: [],
						},
					],
				},
			},
		});

		const result = await renderPage();

		const sidebar = result.getByLabelText('series list');

		await waitFor(() => {
			expect(getByText(sidebar, '5m')).toBeInTheDocument();
		});
	});

	it('displays favorite button for sequence recordings', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
				canonicalPath: 'series_path',
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							canonicalPath: 'sibling_path',
							persons: [],
						},
					],
				},
			},
		});

		const result = await renderPage();

		const sidebar = result.getByLabelText('series list');

		expect(getByLabelText(sidebar, 'Favorite')).toBeInTheDocument();
	});

	it('displays part info', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
				canonicalPath: 'series_path',
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							canonicalPath: 'sibling_path',
							persons: [],
							sequenceIndex: 1,
							sequence: {
								recordings: {
									aggregate: {
										count: 3,
									},
								},
							},
						},
					],
				},
			},
		});

		const result = await renderPage();

		const sidebar = result.getByLabelText('series list');

		await waitFor(() => {
			expect(getByText(sidebar, 'Part 1 of 3')).toBeInTheDocument();
		});
	});

	it('includes series title in metadata', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
				canonicalPath: 'series_path',
			},
		});

		const result = await renderPage();

		const metadata = result.getByLabelText('metadata');

		expect(getByText(metadata, 'series_title')).toBeInTheDocument();
	});

	it('links series title in metadata', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				canonicalPath: '/series_path',
				contentType: SequenceContentType.Series,
			},
		});

		const result = await renderPage();
		const metadata = result.getByLabelText('metadata');
		const link = getByText(metadata, 'series_title');

		expect(link).toHaveAttribute(
			'href',
			expect.stringContaining('/series_path')
		);
	});

	it('includes collection title in metadata', async () => {
		loadSermonDetailData({
			collection: {
				id: 'collection_id',
				title: 'collection_title',
				canonicalPath: 'the_collection_path',
			},
		});

		const result = await renderPage();
		const metadata = result.getByLabelText('metadata');

		expect(getByText(metadata, 'collection_title')).toBeInTheDocument();
	});

	it('links conference title in metadata', async () => {
		loadSermonDetailData({
			collection: {
				id: 'conference_id',
				title: 'conference_title',
				canonicalPath: '/conference_path',
			},
		});

		const result = await renderPage();
		const metadata = result.getByLabelText('metadata');
		const link = getByText(metadata, 'conference_title');

		expect(link).toHaveAttribute(
			'href',
			expect.stringContaining('/conference_path')
		);
	});

	it('does not show video downloads header in downloads menu if no video downloads', async () => {
		loadSermonDetailData();

		const { queryByText } = await renderPage();

		expect(queryByText('Video Downloads')).not.toBeInTheDocument();
	});
});

// TODO:
// sidebar titles are linked
// Does not show selected recording in sidebar?
