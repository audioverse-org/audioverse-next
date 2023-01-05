import { __loadQuery } from 'next/router';

import { __load, __loadReject, fetchApi } from '@lib/api/fetchApi';
import {
	GetSongAlbumsDetailPageDataDocument,
	GetSongAlbumsDetailPathsDataDocument,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Song, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/songs/albums/[id]/[[...slugs]]';
import { beforeEach, describe, expect, it } from 'vitest';

const renderPage = buildStaticRenderer(Song, getStaticProps);

describe('song album detail page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_album_id',
		});
	});

	it('renders', async () => {
		__load(GetSongAlbumsDetailPageDataDocument, {
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
		__load(GetSongAlbumsDetailPathsDataDocument, {
			musicAlbums: {
				nodes: [
					{
						canonicalPath: 'the_album_path',
					},
				],
			},
		});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('the_album_path');
	});

	it('renders 404', async () => {
		__loadReject(GetSongAlbumsDetailPageDataDocument, 'oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
