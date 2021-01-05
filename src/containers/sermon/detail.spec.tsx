import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import videojs from 'video.js';

import { getSermon, getSermons } from '@lib/api';
import {
	loadRouter,
	loadSermon,
	loadSermons,
	renderWithIntl,
} from '@lib/test/helpers';
import SermonDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sermons/[id]';

jest.mock('next/router');
jest.mock('video.js');
jest.mock('@lib/api/getSermon');
jest.mock('@lib/api/getSermons');
jest.mock('@lib/api/fetchApi');

function loadRecentSermons() {
	loadSermons({
		nodes: [
			{
				id: 1,
				title: 'the_sermon_title',
				recordingDate: '2020-06-01T09:30:00.000Z',
			},
		],
	});
}

function loadGetSermonError() {
	(getSermon as jest.Mock).mockImplementation(() => {
		throw new Error('API failure');
	});
}

async function renderPage() {
	const { props } = await getStaticProps({ params: { id: '1' } });
	return renderWithIntl(SermonDetail, props);
}

describe('detailPageGenerator', () => {
	beforeEach(() => jest.resetAllMocks());

	it('gets sermons', async () => {
		loadRecentSermons();

		await getStaticPaths();

		await waitFor(() =>
			expect(getSermons).toBeCalledWith('ENGLISH', { first: 1000 })
		);
	});

	it('gets recent sermons in all languages', async () => {
		loadRecentSermons();

		await getStaticPaths();

		await waitFor(() =>
			expect(getSermons).toBeCalledWith('SPANISH', { first: 1000 })
		);
	});

	it('returns paths', async () => {
		loadRecentSermons();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/sermons/1');
	});

	it('generates localized paths', async () => {
		loadRecentSermons();

		const result = await getStaticPaths();

		expect(result.paths).toContain('/es/sermons/1');
	});

	it('catches API errors', async () => {
		loadGetSermonError();

		const result = await getStaticProps({ params: { id: '1' } });

		expect(result.props.sermon).toBeNull();
	});

	it('renders 404 on missing sermon', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: false });
		loadGetSermonError();

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('shows loading screen', async () => {
		(useRouter as jest.Mock).mockReturnValue({ isFallback: true });

		const { getByText } = await renderPage();

		expect(getByText('Loading…')).toBeInTheDocument();
	});

	it('has favorite button', async () => {
		loadRouter({ isFallback: false });
		loadSermon();

		const { getByText } = await renderPage();

		expect(getByText('Favorite')).toBeInTheDocument();
	});

	it('includes player', async () => {
		loadRouter({ isFallback: false });
		loadSermon({
			audioFiles: ['the_source'],
		});

		await renderPage();

		expect(videojs).toBeCalled();
	});

	it('enables controls', async () => {
		loadRouter({ isFallback: false });
		loadSermon({
			audioFiles: ['the_source'],
		});

		await renderPage();

		const call = ((videojs as any) as jest.Mock).mock.calls[0];
		const options = call[1];

		expect(options.controls).toBeTruthy();
	});

	it('makes fluid player', async () => {
		loadRouter({ isFallback: false });
		loadSermon({
			audioFiles: ['the_source'],
		});

		await renderPage();

		const call = ((videojs as any) as jest.Mock).mock.calls[0];
		const options = call[1];

		expect(options.fluid).toBeTruthy();
	});

	it('sets poster', async () => {
		loadRouter({ isFallback: false });
		loadSermon({
			audioFiles: ['the_source'],
		});

		await renderPage();

		const call = ((videojs as any) as jest.Mock).mock.calls[0];
		const options = call[1];

		expect(options.poster).toBeDefined();
	});

	it('toggles sources', async () => {
		loadRouter({ isFallback: false });
		loadSermon({
			id: '1',
			title: 'the_sermon_title',
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoStreams: [{ url: 'video_url', mimeType: 'video_mimetype' }],
		});

		const { getByText } = await renderPage();

		userEvent.click(getByText('Play Audio'));

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

	it('toggles toggle button label', async () => {
		loadRouter({ isFallback: false });
		loadSermon({
			id: '1',
			title: 'the_sermon_title',
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoStreams: [{ url: 'video_url', mimeType: 'video_mimetype' }],
		});

		const { getByText } = await renderPage();

		userEvent.click(getByText('Play Audio'));

		expect(getByText('Play Video')).toBeInTheDocument();
	});

	it('falls back to video files', async () => {
		loadRouter({ isFallback: false });
		loadSermon({
			id: '1',
			title: 'the_sermon_title',
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoFiles: [{ url: 'video_url', mimeType: 'video_mimetype' }],
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
		loadRouter({ isFallback: false });
		loadSermon({
			id: '1',
			title: 'the_sermon_title',
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
			videoFiles: [],
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
		loadRouter({ isFallback: false });
		loadSermon({
			id: '1',
			title: 'the_sermon_title',
			persons: [],
			audioFiles: [{ url: 'audio_url', mimeType: 'audio_mimetype' }],
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Play Audio')).not.toBeInTheDocument();
	});

	it('has playlist button', async () => {
		loadRouter({ isFallback: false });
		loadSermon({});

		const { getByText } = await renderPage();

		expect(getByText('Add to Playlist')).toBeInTheDocument();
	});

	describe('with process.env', () => {
		const oldEnv = process.env;

		beforeEach(() => {
			jest.resetModules();
		});

		afterEach(() => {
			process.env = oldEnv;
		});

		it('loads fewer sermons in development', async () => {
			process.env = {
				...process.env,
				NODE_ENV: 'development',
			};

			loadRecentSermons();

			await getStaticPaths();

			await waitFor(() =>
				expect(getSermons).toBeCalledWith('SPANISH', { first: 10 })
			);
		});
	});

	it('uses speaker name widget', async () => {
		loadRouter({ isFallback: false });
		loadSermon({
			id: '1',
			title: 'the_sermon_title',
			persons: [
				{
					id: 'the_id',
					name: 'the_name',
					summary: 'the_summary',
				},
			],
		});

		const { getByText } = await renderPage();

		expect(getByText('the_summary')).toBeInTheDocument();
	});

	it('includes donation banner', async () => {
		loadRouter({ isFallback: false });
		loadSermon({});

		const { getByText } = await renderPage();

		expect(
			getByText('Just a $10 donation will help us reach 300 more people!')
		).toBeInTheDocument();
	});

	it('includes a donate button', async () => {
		loadRouter({ isFallback: false });
		loadSermon({});

		const { getByText } = await renderPage();

		expect(getByText('Give Now!')).toBeInTheDocument();
	});
});
