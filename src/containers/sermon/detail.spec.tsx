import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import { __loadQuery, __loadRouter } from 'next/router';
import React from 'react';
import videojs from 'video.js';

import AndMiniplayer from '@components/templates/andMiniplayer';
import AndPlaybackContext from '@components/templates/andPlaybackContext';
import { SermonDetailProps } from '@containers/sermon/detail';
import { fetchApi } from '@lib/api/fetchApi';
import {
	GetSermonDetailDataDocument,
	GetSermonDetailStaticPathsDocument,
	Language,
	RecordingContentType,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import renderWithProviders from '@lib/test/renderWithProviders';
import setPlayerMock from '@lib/test/setPlayerMock';
import SermonDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/teachings/[id]/[[...slug]]';
import { simulateMediaTick } from '@lib/test/simulateMediaTick';

jest.mock('video.js');
jest.mock('@lib/api/fetchApi');
jest.mock('next/link');
jest.mock('@components/molecules/helpWidget');

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
		canonicalPath: '',
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
					first: 10,
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
					first: 10,
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

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('shows loading screen', async () => {
		__loadRouter({ isFallback: true });

		await renderWithProviders(<SermonDetail recording={null} />, undefined);

		expect(screen.getByLabelText('Loading…')).toBeInTheDocument();
	});

	it('has favorite button', async () => {
		loadSermonDetailData();

		await renderPage();

		expect(screen.getByLabelText('Favorite')).toBeInTheDocument();
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

		await renderPage();

		userEvent.click(screen.getByLabelText('play'));

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

		await renderPage();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => {
			expect(videojs).toBeCalledWith(
				expect.anything(),
				expect.objectContaining({
					poster: expect.anything(),
				})
			);
		});
	});

	it('toggles sources', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoStreams: [{ url: 'video_url', mimeType: 'video_mimetype' }],
		});

		await renderPage();

		userEvent.click(screen.getByText('Audio'));

		await waitFor(() => {
			expect(videojs).toBeCalledWith(
				expect.anything(),
				expect.objectContaining({
					sources: expect.arrayContaining([
						{
							src: 'audio_url',
							type: 'audio_mimetype',
						},
					]),
				})
			);
		});
	});

	it('falls back to video files', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
			videoStreams: [],
		});

		await renderPage();

		userEvent.click(screen.getByAltText('the_sermon_title'));

		await waitFor(() => {
			expect(videojs).toBeCalledWith(
				expect.anything(),
				expect.objectContaining({
					sources: expect.arrayContaining([
						expect.objectContaining({
							src: 'video_url',
							type: 'video_mimetype',
						}),
					]),
				})
			);
		});
	});

	it('falls back to audio files', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoFiles: [],
			videoStreams: [],
		});

		await renderPage();

		userEvent.click(screen.getByLabelText('play'));

		await waitFor(() => {
			expect(videojs).toBeCalledWith(
				expect.anything(),
				expect.objectContaining({
					sources: expect.arrayContaining([
						expect.objectContaining({
							src: 'audio_url',
							type: 'audio_mimetype',
						}),
					]),
				})
			);
		});
	});

	it('hides toggle if no video', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			speakers: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
		});

		await renderPage();

		expect(screen.queryByText('Play Audio')).not.toBeInTheDocument();
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

		await renderPage();

		expect(screen.getAllByText('the_name').length > 0).toBeTruthy();
	});

	it('includes sponsor title', async () => {
		loadSermonDetailData({
			sponsor: {
				title: 'the_title',
				location: 'the_location',
			},
		});

		await renderPage();

		expect(screen.getByText('the_title')).toBeInTheDocument();
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
			recordingDate: '253-03-01 09:30:00',
		});

		await renderPage();

		expect(screen.getByText('March 1, 253, 9:30 AM')).toBeInTheDocument();
	});

	it('includes series title', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
			},
		});

		await renderPage();

		expect(screen.getAllByText('series_title').length).toBeGreaterThanOrEqual(
			2
		);
	});

	it('does not include series heading if no series', async () => {
		loadSermonDetailData();

		await renderPage();

		expect(screen.queryByText('Series')).not.toBeInTheDocument();
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

		await renderPage();

		const link = screen.getByRole('link', { name: 'series_title' });

		expect(link).toHaveAttribute('href', 'series_path');
	});

	it('uses language base route in series link', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				canonicalPath: '/es/series_path',
				contentType: SequenceContentType.Series,
			},
			language: Language.Spanish,
		});

		__loadQuery({
			language: 'es',
		});

		await renderPage();

		const link = screen.getByRole('link', { name: 'series_title' });

		expect(link).toHaveAttribute('href', '/es/series_path');
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

		await renderPage();

		expect(
			screen.getByText('Copyright ⓒ1999 the_sponsor.')
		).toBeInTheDocument();
	});

	it('falls back to top-level sponsor', async () => {
		loadSermonDetailData({
			copyrightYear: 1999,
			sponsor: {
				title: 'the_sponsor',
			},
		});

		await renderPage();

		expect(
			screen.getByText('Copyright ⓒ1999 the_sponsor.')
		).toBeInTheDocument();
	});

	it('displays license summary', async () => {
		loadSermonDetailData({
			distributionAgreement: {
				license: {
					summary: 'the_license_summary',
				},
			},
		});

		await renderPage();

		expect(screen.getByText('the_license_summary')).toBeInTheDocument();
	});

	it('does not display missing copyright image', async () => {
		loadSermonDetailData();

		await renderPage();

		expect(screen.queryByAltText('copyright')).not.toBeInTheDocument();
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

		await renderPage();

		const link = screen.getByText('High Quality (1 GB)') as HTMLLinkElement;

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

		await renderPage();

		const link = screen.getByText('High Quality (1 GB)') as HTMLLinkElement;

		expect(link.href).toContain('the_url');
	});

	it('displays recordings in series', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
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

		await renderPage();

		await waitFor(() =>
			expect(fetchApi).toBeCalledWith(
				GetSermonDetailDataDocument,
				expect.anything()
			)
		);

		expect(screen.getByText('sibling_title')).toBeInTheDocument();
	});

	it('includes transcripts', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		userEvent.click(screen.getByText('Read Transcript'));

		expect(screen.getByText('the_transcript_text')).toBeInTheDocument();
	});

	it('notes probable auto generation', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		userEvent.click(screen.getByText('Read Transcript'));

		expect(
			screen.getByText('This transcript may be automatically generated.')
		).toBeInTheDocument();
	});

	it('includes transcript assistance request', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		userEvent.click(screen.getByText('Read Transcript'));

		expect(
			screen.getByText(
				'Our auto-generated transcripts need your help. Feel free to e-mail us your edited text of this transcript for your benefit and others. media@audioverse.org'
			)
		).toBeInTheDocument();
	});

	it('does not include transcript section if no transcript', async () => {
		loadSermonDetailData({
			transcript: {
				text: '',
			},
		});

		await renderPage();

		expect(screen.queryByText('Transcript')).not.toBeInTheDocument();
	});

	it('includes share url', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		await renderPage();

		userEvent.click(screen.getByLabelText('share'));

		expect((screen.getByText('Copy Link') as HTMLAnchorElement).href).toContain(
			'the_share_url'
		);
	});

	it('includes share url title', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		await renderPage();

		userEvent.click(screen.getByLabelText('share'));

		expect(screen.getByText('Copy Link')).toBeInTheDocument();
	});

	it('includes share title', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		await renderPage();

		userEvent.click(screen.getByLabelText('share'));

		expect(screen.getByText('Share')).toBeInTheDocument();
	});

	it('has embed input', async () => {
		loadSermonDetailData();

		await renderPage();

		userEvent.click(screen.getByLabelText('share'));

		expect(screen.getByText('Audio Embed Code')).toBeInTheDocument();
	});

	it('populates embed input', async () => {
		loadSermonDetailData();

		await renderPage();

		userEvent.click(screen.getByLabelText('share'));

		await expect(
			screen.findByDisplayValue(
				'https://www.audioverse.org/english/embed/media/the_sermon_id',
				{ exact: false }
			)
		).resolves.toBeInTheDocument();
	});

	it('renders 404 on fetch error', async () => {
		when(fetchApi)
			.calledWith(GetSermonDetailDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('renders part number', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
			},
			sequenceIndex: 1,
		});

		await renderPage();

		expect(screen.getByText('Part 1')).toBeInTheDocument();
	});

	it('links to previous recording', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
			},
			sequenceIndex: 2,
			sequencePreviousRecording: {
				id: 1,
				canonicalPath: '/en/teachings/1',
			},
		});

		await renderPage();

		expect(screen.getByText('Previous')).toHaveAttribute(
			'href',
			'/en/teachings/1'
		);
	});

	it('links to next recording', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
			},
			sequenceIndex: 2,
			sequenceNextRecording: {
				id: 3,
				canonicalPath: '/en/teachings/3',
			},
		});

		await renderPage();

		expect(screen.getByText('Next')).toHaveAttribute('href', '/en/teachings/3');
	});

	it('links sponsor title', async () => {
		loadSermonDetailData({
			sponsor: {
				id: 'sponsor_id',
				title: 'sponsor_title',
				canonicalPath: '/sponsor_path',
			},
		});

		await renderPage();

		expect(screen.getByText('sponsor_title')).toHaveAttribute(
			'href',
			'/sponsor_path'
		);
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

		await renderPage();

		const player = within(screen.getByLabelText('player'));

		userEvent.click(screen.getByText('Audio'));

		const play = await player.findByLabelText('play');

		userEvent.click(play);
		userEvent.click(screen.getByText('Video'));
		userEvent.click(screen.getByText('Audio'));

		await expect(player.findByLabelText('play')).resolves.toBeInTheDocument();
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

		await renderPage();

		expect(screen.getByText('Audio')).toBeInTheDocument();
		expect(screen.getByText('Video')).toBeInTheDocument();
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

		await renderPage();

		expect(screen.getByText('Video')).toHaveAttribute('aria-pressed', 'true');
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

		userEvent.click(screen.getByText('Audio'));

		expect(screen.getByText('Audio')).toHaveAttribute('aria-pressed', 'true');

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});
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

		await renderPage();

		expect(screen.getByText('Audio')).toHaveAttribute('aria-pressed', 'false');
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

		await renderPage();

		userEvent.click(screen.getByText('Audio'));

		const player = within(screen.getByLabelText('player'));

		expect(player.getByText('0:00')).toBeInTheDocument();

		await waitFor(() => {
			expect(videojs).toBeCalled();
		});
	});

	it('hides transcript', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		expect(screen.queryByText('the_transcript_text')).not.toBeInTheDocument();
	});

	it('uses hide verb for button', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		await renderPage();

		userEvent.click(screen.getByText('Read Transcript'));

		expect(screen.getByText('Hide Transcript')).toBeInTheDocument();
	});

	it('displays play buttons for sequence recordings', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
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

		await renderPage();

		const sidebar = within(screen.getByLabelText('series list'));

		expect(sidebar.getByLabelText('play')).toBeInTheDocument();
	});

	it('loads series video into miniplayer on first click', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
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

		const sidebar = within(screen.getByLabelText('series list'));

		userEvent.click(sidebar.getByLabelText('play'));

		const miniplayer = within(screen.getByLabelText('miniplayer'));

		await waitFor(() => {
			expect(miniplayer.getByTestId('video-element')).toBeInTheDocument();
		});
	});

	it('loads series video into miniplayer after loading detail video into portal', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
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

		const player = within(screen.getByLabelText('player'));

		userEvent.click(player.getByLabelText('play'));

		const sidebar = within(screen.getByLabelText('series list'));

		userEvent.click(sidebar.getByLabelText('play'));

		const miniplayer = within(screen.getByLabelText('miniplayer'));

		await expect(
			miniplayer.findByTestId('video-element')
		).resolves.toBeInTheDocument();
	});

	it('starts at beginning when playing series recording', async () => {
		const mockPlayer = setPlayerMock();

		loadSermonDetailData({
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			sequence: {
				contentType: SequenceContentType.Series,
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

		const player = within(screen.getByLabelText('player'));

		userEvent.click(player.getByLabelText('play'));

		await expect(player.findByLabelText('pause')).resolves.toBeInTheDocument();

		mockPlayer.currentTime(50);

		await simulateMediaTick();

		await expect(player.findByText('0:50')).resolves.toBeInTheDocument();

		const sidebar = within(screen.getByLabelText('series list'));

		userEvent.click(sidebar.getByLabelText('play'));

		expect(mockPlayer.currentTime).toBeCalledWith(0);

		const miniplayer = within(screen.getByLabelText('miniplayer'));

		await expect(miniplayer.findByLabelText('progress')).resolves.toHaveValue(
			'0'
		);
	});

	it('displays durations in sidebar', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
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

		await renderPage();

		const sidebar = within(screen.getByLabelText('series list'));

		await expect(sidebar.findByText('5m')).resolves.toBeInTheDocument();
	});

	it('displays favorite button for sequence recordings', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
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

		await renderPage();

		const sidebar = within(screen.getByLabelText('series list'));

		expect(sidebar.getByLabelText('Favorite')).toBeInTheDocument();
	});

	it('displays part info', async () => {
		loadSermonDetailData({
			sequence: {
				contentType: SequenceContentType.Series,
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

		await renderPage();

		const sidebar = within(screen.getByLabelText('series list'));

		await waitFor(() => {
			expect(sidebar.getByText('Part 1 of 3')).toBeInTheDocument();
		});
	});

	it('includes series title in metadata', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				contentType: SequenceContentType.Series,
			},
		});

		await renderPage();

		const metadata = within(screen.getByLabelText('metadata'));

		expect(metadata.getByText('series_title')).toBeInTheDocument();
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

		await renderPage();
		const metadata = within(screen.getByLabelText('metadata'));
		const link = metadata.getByText('series_title');

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
			},
		});

		await renderPage();

		const metadata = within(screen.getByLabelText('metadata'));

		expect(metadata.getByText('collection_title')).toBeInTheDocument();
	});

	it('links conference title in metadata', async () => {
		loadSermonDetailData({
			collection: {
				id: 'conference_id',
				title: 'conference_title',
				canonicalPath: '/conference_path',
			},
		});

		await renderPage();
		const metadata = within(screen.getByLabelText('metadata'));
		const link = metadata.getByText('conference_title');

		expect(link).toHaveAttribute(
			'href',
			expect.stringContaining('/conference_path')
		);
	});

	it('does not show video downloads header in downloads menu if no video downloads', async () => {
		loadSermonDetailData();

		await renderPage();

		expect(screen.queryByText('Video Downloads')).not.toBeInTheDocument();
	});
});

// TODO:
// sidebar titles are linked
// Does not show selected recording in sidebar?
