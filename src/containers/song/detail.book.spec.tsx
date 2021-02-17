import { when } from 'jest-when';

import { GetSongBookPageDataDocument } from '@lib/generated/graphql';
import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import Song, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/songs/book/[book]';

const renderPage = buildRenderer(Song, getStaticProps, {
	language: 'en',
	book: 'Genesis',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetSongBookPageDataDocument, expect.anything())
		.mockResolvedValue({
			musicTracks: {
				nodes: [
					{
						id: 'first_song_id',
						title: 'first_song_title',
						shareUrl: 'first_song_shareurl',
					},
					{
						id: 'second_song_id',
						title: 'second_song_title',
						shareUrl: 'second_song_shareurl',
					},
				],
			},
		});
}

describe('song book detail page', () => {
	it('renders page', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetSongBookPageDataDocument, {
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

	it('displays short url', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('first_song_shareurl')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/book/Genesis');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongBookPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});
