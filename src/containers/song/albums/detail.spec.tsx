import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { SequenceContentType } from '@src/__generated__/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Song, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/songs/albums/[id]/[[...slugs]]';
import { screen } from '@testing-library/react';
import {
	GetSongAlbumsDetailPageDataDocument,
	GetSongAlbumsDetailPathsDataDocument,
} from '@containers/song/albums/__generated__/detail';

const renderPage = buildStaticRenderer(Song, getStaticProps);

describe('song album detail page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_album_id',
		});
	});

	it('renders', async () => {
		when(fetchApi)
			.calledWith(GetSongAlbumsDetailPageDataDocument, expect.anything())
			.mockResolvedValue({
				musicAlbum: {
					id: 'the_album_id',
					title: 'the_album_title',
					contentType: SequenceContentType.MusicAlbum,
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

		expect(fetchApi).toBeCalledWith(GetSongAlbumsDetailPageDataDocument, {
			variables: {
				id: 'the_album_id',
			},
		});
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetSongAlbumsDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				musicAlbums: {
					nodes: [
						{
							canonicalPath: '/the_album_path',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/the_album_path');
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetSongAlbumsDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});
});
