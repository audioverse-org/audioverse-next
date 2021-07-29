import { queryByTestId, waitFor } from '@testing-library/dom';
import { act, getByLabelText, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import videojs from 'video.js';

import AndMiniplayer from '@components/templates/andMiniplayer';
import { SermonDetailProps } from '@containers/sermon/detail';
import {
	GetSermonDetailDataDocument,
	GetSermonDetailStaticPathsDocument,
} from '@lib/generated/graphql';
import {
	buildStaticRenderer,
	loadRouter,
	mockedFetchApi,
	renderWithIntl,
	setPlayerMock,
} from '@lib/test/helpers';
import SermonDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sermons/[id]';

jest.mock('next/router');
jest.mock('video.js');
jest.mock('@lib/api/fetchApi');

// TODO: Move getSermonDetailStaticPaths graphql query to detail.graphql
function loadSermonDetailPathsData() {
	when(mockedFetchApi)
		.calledWith(GetSermonDetailStaticPathsDocument, expect.anything())
		.mockResolvedValue({
			sermons: {
				nodes: [
					{
						id: 'sermon_id',
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
		persons: [],
		audioFiles: [],
		videoFiles: [],
		audioDownloads: [],
		videoDownloads: [],
		...sermon,
	};

	when(mockedFetchApi)
		.calledWith(GetSermonDetailDataDocument, expect.anything())
		.mockResolvedValue({ sermon });
}

const renderPage = buildStaticRenderer(
	(props: SermonDetailProps) => {
		return (
			<AndMiniplayer>
				<SermonDetail {...props} />
			</AndMiniplayer>
		);
	},
	getStaticProps,
	{
		language: 'en',
		id: 'the_sermon_id',
	}
);

describe('sermon detail page', () => {
	beforeEach(() => {
		loadRouter({ isFallback: false });
		setPlayerMock();
	});

	it('gets sermons', async () => {
		loadSermonDetailPathsData();

		await getStaticPaths();

		await waitFor(() =>
			expect(mockedFetchApi).toBeCalledWith(
				GetSermonDetailStaticPathsDocument,
				{
					variables: {
						language: 'ENGLISH',
						first: 200,
					},
				}
			)
		);
	});

	it('gets recent sermons in all languages', async () => {
		loadSermonDetailPathsData();

		await getStaticPaths();

		await waitFor(() =>
			expect(mockedFetchApi).toBeCalledWith(
				GetSermonDetailStaticPathsDocument,
				{
					variables: {
						language: 'SPANISH',
						first: 200,
					},
				}
			)
		);
	});

	it('returns paths', async () => {
		loadSermonDetailPathsData();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/sermons/sermon_id');
	});

	it('generates localized paths', async () => {
		loadSermonDetailPathsData();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/sermon_id');
	});

	it('catches API errors', async () => {
		when(mockedFetchApi)
			.calledWith(GetSermonDetailDataDocument, expect.anything())
			.mockRejectedValue('Oops!');

		const result = await getStaticProps({ params: { id: '1' } });

		expect(result.props.sermon).toBeNull();
	});

	it('renders 404 on missing sermon', async () => {
		when(mockedFetchApi)
			.calledWith(GetSermonDetailDataDocument, expect.anything())
			.mockRejectedValue('Oops!');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('shows loading screen', async () => {
		loadRouter({ isFallback: true });

		const { getByText } = await renderWithIntl(
			<SermonDetail sermon={null} title={null} />
		);

		expect(getByText('Loading…')).toBeInTheDocument();
	});

	it('has favorite button', async () => {
		loadSermonDetailData();

		const { getByLabelText } = await renderPage();

		expect(getByLabelText('Favorite')).toBeInTheDocument();
	});

	it('includes player', async () => {
		loadSermonDetailData({
			audioFiles: ['the_source'],
		});

		const { getByLabelText } = await renderPage();

		userEvent.click(getByLabelText('play'));

		expect(videojs).toBeCalled();
	});

	it('sets poster', async () => {
		loadSermonDetailData({
			audioFiles: ['the_source'],
		});

		const { getByLabelText } = await renderPage();

		userEvent.click(getByLabelText('play'));

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
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoStreams: [{ url: 'video_url', mimeType: 'video_mimetype' }],
		});

		const { getByText } = await renderPage();

		userEvent.click(getByText('Audio'));

		const calls = ((videojs as any) as jest.Mock).mock.calls;
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
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
			videoStreams: [],
		});

		const { getByAltText } = await renderPage();

		const poster = getByAltText('the_sermon_title') as HTMLElement;

		userEvent.click(poster.parentElement as HTMLElement);

		const calls = ((videojs as any) as jest.Mock).mock.calls;
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
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoFiles: [],
			videoStreams: [],
		});

		const { getByLabelText } = await renderPage();

		userEvent.click(getByLabelText('play'));

		const calls = ((videojs as any) as jest.Mock).mock.calls;
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
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Play Audio')).not.toBeInTheDocument();
	});

	it('uses speaker name widget', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			persons: [
				{
					id: 'the_id',
					name: 'the_name',
					summary: 'the_summary',
				},
			],
		});

		const { getAllByText } = await renderPage();

		expect(getAllByText('the_summary').length > 0).toBeTruthy();
	});

	it('includes sponsor title', async () => {
		loadSermonDetailData({
			sponsor: {
				title: 'the_title',
				location: 'the_location',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('the_title')).toBeInTheDocument();
	});

	it('includes time recorded', async () => {
		mockedFetchApi.mockResolvedValue({});

		loadSermonDetailData({
			persons: [
				{
					id: 'the_id',
					name: 'the_name',
				},
			],
			recordingDate: '2003-03-01T09:30:00.000Z',
		});

		const { getByText } = await renderPage();

		expect(getByText('March 1, 2003, 9:30 AM')).toBeInTheDocument();
	});

	it('includes series title', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
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
			},
		});

		const { getAllByText } = await renderPage();

		const link = getAllByText('series_title')[0]
			.parentElement as HTMLLinkElement;

		expect(link.href).toContain('/en/series/series_id');
	});

	it('uses language base route in series link', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
			},
		});

		const { getAllByText } = await renderPage({
			params: {
				language: 'es',
			},
		});

		const link = getAllByText('series_title')[0]
			.parentElement as HTMLLinkElement;

		expect(link.href).toContain('/es/series/series_id');
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

		expect(getByText('Copyright ⓒ1999 the_sponsor'));
	});

	it('falls back to top-level sponsor', async () => {
		loadSermonDetailData({
			copyrightYear: 1999,
			sponsor: {
				title: 'the_sponsor',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('Copyright ⓒ1999 the_sponsor')).toBeInTheDocument();
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

	it('displays copyright image', async () => {
		loadSermonDetailData({
			distributionAgreement: {
				license: {
					image: {
						url: 'the_license_image_url',
					},
				},
			},
		});

		const { getByAltText } = await renderPage();

		const image = getByAltText('copyright') as HTMLImageElement;

		expect(image.src).toContain('the_license_image_url');
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

		const link = getByText('1 GB') as HTMLLinkElement;

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

		const link = getByText('1 GB') as HTMLLinkElement;

		expect(link.href).toContain('the_url');
	});

	it('displays recordings in series', async () => {
		loadSermonDetailData({
			sequence: {
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
						},
					],
				},
			},
		});

		const { getByText } = await renderPage();

		await waitFor(() =>
			expect(mockedFetchApi).toBeCalledWith(
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

		const { getByText } = await renderPage();

		userEvent.click(getByText('Read Transcript'));

		expect(getByText('the_transcript_text')).toBeInTheDocument();
	});

	it('notes probable auto generation', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		const { getByText } = await renderPage();

		userEvent.click(getByText('Read Transcript'));

		expect(
			getByText('This transcript may be automatically generated.')
		).toBeInTheDocument();
	});

	it('includes transcript assistance request', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		const { getByText } = await renderPage();

		userEvent.click(getByText('Read Transcript'));

		expect(
			getByText(
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

		const { queryByText } = await renderPage();

		expect(queryByText('Transcript')).not.toBeInTheDocument();
	});

	it('includes share url', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		const { getByText, getByLabelText } = await renderPage();

		userEvent.click(getByLabelText('share'));

		expect(getByText('the_share_url')).toBeInTheDocument();
	});

	it('includes share url title', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		const { getByText, getByLabelText } = await renderPage();

		userEvent.click(getByLabelText('share'));

		expect(getByText('Short URL')).toBeInTheDocument();
	});

	it('includes share title', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		const { getByText, getByLabelText } = await renderPage();

		userEvent.click(getByLabelText('share'));

		expect(getByText('Share')).toBeInTheDocument();
	});

	it('has embed input', async () => {
		loadSermonDetailData();

		const { getByLabelText } = await renderPage();

		userEvent.click(getByLabelText('share'));

		expect(getByLabelText('Embed Code')).toBeInTheDocument();
	});

	it('populates embed input', async () => {
		loadSermonDetailData();

		const { getByLabelText } = await renderPage();

		userEvent.click(getByLabelText('share'));

		const input = getByLabelText('Embed Code') as HTMLInputElement;

		expect(input.value).toContain(
			'https://www.audioverse.org/english/embed/media/the_sermon_id'
		);
	});

	it('renders 404 on fetch error', async () => {
		when(mockedFetchApi)
			.calledWith(GetSermonDetailDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('renders part number', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
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
				recordings: {
					nodes: [
						{
							id: 1,
						},
						{
							id: 2,
						},
						{
							id: 3,
						},
					],
				},
			},
			sequenceIndex: 2,
		});

		const { getByLabelText } = await renderPage();

		expect(getByLabelText('Previous')).toHaveAttribute('href', '/en/sermons/1');
	});

	it('links to next recording', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
				recordings: {
					nodes: [
						{
							id: 1,
						},
						{
							id: 2,
						},
						{
							id: 3,
						},
					],
				},
			},
			sequenceIndex: 2,
		});

		const { getByLabelText } = await renderPage();

		expect(getByLabelText('Next')).toHaveAttribute('href', '/en/sermons/3');
	});

	it('links sponsor title', async () => {
		loadSermonDetailData({
			sponsor: {
				id: 'sponsor_id',
				title: 'sponsor_title',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/sponsor_id'
		);
	});

	it('sets head title', async () => {
		loadSermonDetailData();

		const result = await getStaticProps({ params: { id: 'the_id' } });

		expect(result.props.title).toEqual('the_sermon_title');
	});

	it('sets paused to true when switching formats', async () => {
		await act(async () => {
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

			userEvent.click(result.getByText('Audio'));
			await waitFor(() =>
				expect(getByLabelText(player, 'play')).toBeInTheDocument()
			);
			userEvent.click(getByLabelText(player, 'play'));
			userEvent.click(result.getByText('Video'));
			userEvent.click(result.getByText('Audio'));
			await waitFor(() =>
				expect(getByLabelText(player, 'play')).toBeInTheDocument()
			);
			expect(getByLabelText(player, 'play')).toBeInTheDocument();
		});
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

		const { getByText } = await renderPage();

		userEvent.click(getByText('Audio'));

		expect(getByText('Audio')).toHaveAttribute('aria-pressed', 'true');
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

		userEvent.click(result.getByText('Audio'));

		const player = result.getByLabelText('player');

		expect(getByText(player, '0:00')).toBeInTheDocument();
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

		const { getByText } = await renderPage();

		userEvent.click(getByText('Read Transcript'));

		expect(getByText('Hide Transcript')).toBeInTheDocument();
	});

	it('displays play buttons for sequence recordings', async () => {
		loadSermonDetailData({
			sequence: {
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
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
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
						},
					],
				},
			},
		});

		const result = await renderPage();

		const sidebar = result.getByLabelText('series list');

		userEvent.click(getByLabelText(sidebar, 'play'));

		const miniplayer = result.getByLabelText('miniplayer');

		await waitFor(() => {
			expect(queryByTestId(miniplayer, 'video-element')).toBeInTheDocument();
		});
	});

	it('loads series video into miniplayer after loading detail video into portal', async () => {
		loadSermonDetailData({
			sequence: {
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
						},
					],
				},
			},
		});

		const result = await renderPage();

		const player = result.getByLabelText('player');

		userEvent.click(getByLabelText(player, 'play'));

		const sidebar = result.getByLabelText('series list');

		userEvent.click(getByLabelText(sidebar, 'play'));

		const miniplayer = result.getByLabelText('miniplayer');

		await waitFor(() => {
			expect(queryByTestId(miniplayer, 'video-element')).toBeInTheDocument();
		});
	});

	it('starts at beginning when playing series recording', async () => {
		const mockPlayer = setPlayerMock();

		loadSermonDetailData({
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			sequence: {
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
						},
					],
				},
			},
		});

		const result = await renderPage();
		const player = result.getByLabelText('player');

		userEvent.click(getByLabelText(player, 'play'));

		await waitFor(() => {
			expect(getByLabelText(player, 'pause')).toBeInTheDocument();
		});

		mockPlayer.currentTime(50);

		ReactTestUtils.Simulate.timeUpdate(
			result.getByTestId('video-element'),
			{} as any
		);

		await waitFor(() => {
			expect(getByText(player, '0:50')).toBeInTheDocument();
		});

		const sidebar = result.getByLabelText('series list');

		userEvent.click(getByLabelText(sidebar, 'play'));

		expect(mockPlayer.currentTime).toBeCalledWith(0);

		const miniplayer = result.getByLabelText('miniplayer');

		await waitFor(() => {
			expect(getByLabelText(miniplayer, 'progress')).toHaveValue('0');
		});
	});

	it('displays progress bar for sequence recordings', async () => {
		loadSermonDetailData({
			sequence: {
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
						},
					],
				},
			},
		});

		const result = await renderPage();

		const sidebar = result.getByLabelText('series list');

		expect(getByLabelText(sidebar, 'progress')).toBeInTheDocument();
	});

	it('disables sidebar progress bar interactivity', async () => {
		loadSermonDetailData({
			sequence: {
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
						},
					],
				},
			},
		});

		const result = await renderPage();

		const sidebar = result.getByLabelText('series list');

		expect(getByLabelText(sidebar, 'progress')).toBeDisabled();
	});

	it('displays durations in sidebar', async () => {
		loadSermonDetailData({
			sequence: {
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
							duration: 60 * 5,
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
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
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
				recordings: {
					nodes: [
						{
							id: 'the_sibling_id',
							title: 'sibling_title',
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
			},
		});

		const result = await renderPage();
		const metadata = result.getByLabelText('metadata');
		const link = getByText(metadata, 'series_title');

		expect(link).toHaveAttribute('href', expect.stringContaining('series_id'));
	});

	it('includes collection title in metadata', async () => {
		loadSermonDetailData({
			collection: {
				id: 'collection_id',
				title: 'collection_title',
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
			},
		});

		const result = await renderPage();
		const metadata = result.getByLabelText('metadata');
		const link = getByText(metadata, 'conference_title');

		expect(link).toHaveAttribute(
			'href',
			expect.stringContaining('conference_id')
		);
	});
});

// TODO:
// sidebar titles are linked
// Does not show selected recording in sidebar?
