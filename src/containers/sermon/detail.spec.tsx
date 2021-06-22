import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';
import React from 'react';
import videojs from 'video.js';

import AndMiniplayer from '@components/templates/andMiniplayer';
import { SermonDetailProps } from '@containers/sermon/detail';
import {
	GetSermonDetailDataDocument,
	getSermonDetailStaticPaths,
	GetSermonDetailStaticPathsDocument,
} from '@lib/generated/graphql';
import {
	buildStaticRenderer,
	loadRouter,
	mockedFetchApi,
	renderWithIntl,
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
		playerAudioFiles: [],
		playerVideoFiles: [],
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
						first: 250,
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
						first: 250,
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

		const { getByText } = await renderWithIntl(SermonDetail, {
			sermon: undefined,
		});

		expect(getByText('Loading…')).toBeInTheDocument();
	});

	it('has favorite button', async () => {
		loadSermonDetailData();

		const { getByText } = await renderPage();

		expect(getByText('Favorite')).toBeInTheDocument();
	});

	it('includes player', async () => {
		loadSermonDetailData({
			playerAudioFiles: ['the_source'],
		});

		await renderPage();

		expect(videojs).toBeCalled();
	});

	it('enables controls', async () => {
		loadSermonDetailData({
			playerAudioFiles: ['the_source'],
		});

		await renderPage();

		const call = ((videojs as any) as jest.Mock).mock.calls[0];
		const options = call[1];

		expect(options.controls).toBeTruthy();
	});

	it('sets poster', async () => {
		loadSermonDetailData({
			playerAudioFiles: ['the_source'],
		});

		await renderPage();

		const call = ((videojs as any) as jest.Mock).mock.calls[0];
		const options = call[1];

		expect(options.poster).toBeDefined();
	});

	it('toggles sources', async () => {
		loadSermonDetailData({
			title: 'the_sermon_title',
			persons: [],
			playerAudioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
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
			playerAudioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			playerVideoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
			videoStreams: [],
		});

		await renderPage();

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
			playerAudioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			playerVideoFiles: [],
			videoStreams: [],
		});

		await renderPage();

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
			playerAudioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Play Audio')).not.toBeInTheDocument();
	});

	it('has playlist button', async () => {
		loadSermonDetailData({});

		const { getByText } = await renderPage();

		expect(getByText('Add to Playlist')).toBeInTheDocument();
	});

	describe('with process.env', () => {
		const oldEnv = process.env;

		beforeEach(() => {
			jest.resetModules();
			process.env = { ...oldEnv };
		});

		afterEach(() => {
			process.env = oldEnv;
		});

		it('loads fewer sermons in development', async () => {
			jest.isolateModules(async () => {
				(process.env as any).NODE_ENV = 'development';

				loadSermonDetailPathsData();

				await getStaticPaths();

				await waitFor(() =>
					expect(getSermonDetailStaticPaths).toBeCalledWith({
						language: 'SPANISH',
						first: 10,
					})
				);
			});
		});
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

	it('includes tags', async () => {
		loadSermonDetailData({
			recordingTags: {
				nodes: [
					{
						tag: {
							id: 'the_id',
							name: 'the_name',
						},
					},
				],
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('the_name')).toBeInTheDocument();
	});

	it('excludes tag section if no tags', async () => {
		loadSermonDetailData({});

		const { queryByText } = await renderPage();

		expect(queryByText('Tags')).not.toBeInTheDocument();
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

		const { getByText } = await renderPage();

		expect(getByText('series_title')).toBeInTheDocument();
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

		const { getByText } = await renderPage();

		const link = getByText('series_title').parentElement as HTMLLinkElement;

		expect(link.href).toContain('/en/series/series_id');
	});

	it('uses language base route in series link', async () => {
		loadSermonDetailData({
			sequence: {
				id: 'series_id',
				title: 'series_title',
			},
		});

		const { getByText } = await renderPage({
			params: {
				language: 'es',
			},
		});

		const link = getByText('series_title').parentElement as HTMLLinkElement;

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

	it('does not display downloads if no downloads', async () => {
		loadSermonDetailData({
			videoDownloads: [],
			audioDownloads: [],
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Downloads')).not.toBeInTheDocument();
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

	it('does not show audio downloads if none to show', async () => {
		loadSermonDetailData({
			videoDownloads: [
				{
					id: 'the_video_id',
					url: 'the_url',
					filesize: '1073741824',
				},
			],
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Audio Files')).not.toBeInTheDocument();
	});

	it('does not show video downloads if none to show', async () => {
		loadSermonDetailData({
			audioDownloads: [
				{
					id: 'the_audio_id',
					url: 'the_url',
					filesize: '1073741824',
				},
			],
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Video Files')).not.toBeInTheDocument();
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

		expect(getByText('the_transcript_text')).toBeInTheDocument();
	});

	it('includes transcript title', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('Transcript')).toBeInTheDocument();
	});

	it('notes probable auto generation', async () => {
		loadSermonDetailData({
			transcript: {
				text: 'the_transcript_text',
			},
		});

		const { getByText } = await renderPage();

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

		const { getByText } = await renderPage();

		expect(getByText('the_share_url')).toBeInTheDocument();
	});

	it('includes share url title', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		const { getByText } = await renderPage();

		expect(getByText('Short URL')).toBeInTheDocument();
	});

	it('includes share title', async () => {
		loadSermonDetailData({
			shareUrl: 'the_share_url',
		});

		const { getByText } = await renderPage();

		expect(getByText('Share')).toBeInTheDocument();
	});

	it('has embed input', async () => {
		loadSermonDetailData();

		const { getByLabelText } = await renderPage();

		expect(getByLabelText('Embed Code')).toBeInTheDocument();
	});

	it('populates embed input', async () => {
		loadSermonDetailData();

		const { getByLabelText } = await renderPage();

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
});
