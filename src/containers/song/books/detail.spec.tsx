import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { RecordingContentType } from '@src/__generated__/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Song, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/songs/book/[book]';
import { screen } from '@testing-library/react';
import { GetSongBooksDetailPageDataDocument } from '@containers/song/books/__generated__/detail';

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
						persons: [],
					},
					{
						id: 'second_song_id',
						title: 'second_song_title',
						canonicalPath: 'second_song_path',
						contentType: RecordingContentType.MusicTrack,
						shareUrl: 'second_song_shareurl',
						persons: [],
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

		await renderPage();

		expect(screen.getByText('second_song_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/book/genesis');
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetSongBooksDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});
});
