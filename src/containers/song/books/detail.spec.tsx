import { __loadQuery } from 'next/router';

import { __load, __loadReject, fetchApi } from '@/lib/api/fetchApi';
import {
	GetSongBooksDetailPageDataDocument,
	RecordingContentType,
} from '@/lib/generated/graphql';
import { buildStaticRenderer } from '@/lib/test/buildStaticRenderer';
import Song, {
	getStaticPaths,
	getStaticProps,
} from '@/pages/[language]/songs/book/[book]';
import { beforeEach, describe, expect, it } from 'vitest';

const renderPage = buildStaticRenderer(Song, getStaticProps);

function loadData() {
	__load(GetSongBooksDetailPageDataDocument, {
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

		const { getByText } = await renderPage();

		expect(getByText('second_song_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/book/genesis');
	});

	it('renders 404', async () => {
		__loadReject(GetSongBooksDetailPageDataDocument, 'oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
