import { when } from 'jest-when';

import {
	GetSongAlbumsDetailPageDataDocument,
	GetSongAlbumsDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import Song, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/songs/albums/[id]/[[...slugs]]';

const renderPage = buildStaticRenderer(Song, getStaticProps, {
	language: 'en',
	id: 'the_album_id',
});

describe('song album detail page', () => {
	it('renders', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongAlbumsDetailPageDataDocument, expect.anything())
			.mockResolvedValue({
				musicAlbum: {
					id: 'the_album_id',
					title: 'the_album_title',
					canonicalPath: 'the_album_path',
					imageWithFallback: {
						url: 'the_album_cover',
					},
					sponsor: {
						title: 'the_album_sponsor',
						canonicalPath: 'the_album_sponsor_path',
					},
					recordings: {
						aggregate: {
							count: 1,
						},
					},
				},
			});

		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetSongAlbumsDetailPageDataDocument, {
			variables: {
				id: 'the_album_id',
			},
		});
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongAlbumsDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				musicAlbums: {
					nodes: [
						{
							id: 'the_album_id',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/albums/the_album_id');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongAlbumsDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});
