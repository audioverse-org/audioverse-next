import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '~lib/api/fetchApi';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import Song, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/songs/book/[book]';
import { RecordingContentType } from '~src/__generated__/graphql';

import { GetSongBooksDetailPageDataDocument } from './__generated__/detail';

const renderPage = buildStaticRenderer(Song, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetSongBooksDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			musicTracks: {
				nodes: [
					{
						id: 'first_song_id',
						title: 'first_song_title',
						canonicalPath: 'first_song_path',
						contentType: RecordingContentType.MusicTrack,
						shareUrl: 'first_song_shareurl',
						speakers: [],
					},
					{
						id: 'second_song_id',
						title: 'second_song_title',
						canonicalPath: 'second_song_path',
						contentType: RecordingContentType.MusicTrack,
						shareUrl: 'second_song_shareurl',
						speakers: [],
					},
				],
			},
		});
}

describe('song book detail page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			book: 'Genesis',
		});
	});

	it('renders page', async () => {
		loadData();

		await renderPage();

		expect(fetchApi).toBeCalledWith(GetSongBooksDetailPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				book: 'Genesis',
			},
		});
	});

	it('lists songs', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('second_song_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/book/genesis');
	});

	it('renders 404', async () => {
		// Mock console for expected error
		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
		const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

		when(fetchApi)
			.calledWith(GetSongBooksDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();

		consoleError.mockRestore();
		consoleLog.mockRestore();
	});
});
