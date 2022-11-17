import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import {
	GetSongAlbumsListPageDataDocument,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Songs, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/songs/albums';

const renderPage = buildStaticRenderer(Songs, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetSongAlbumsListPageDataDocument, expect.anything())
		.mockResolvedValue({
			musicAlbums: {
				nodes: [
					{
						id: 'the_album_id',
						title: 'the_album_title',
						canonicalPath: 'the_album_path',
						contentType: SequenceContentType.MusicAlbum,
						imageWithFallback: {
							url: 'the_album_cover',
						},
						speakers: {
							nodes: [],
						},
						sponsor: {
							title: 'the_album_sponsor',
						},
						allRecordings: {
							aggregate: {
								count: 0,
							},
						},
					},
				],
			},
			musicBookTags: {
				nodes: [
					{
						id: 'the_tag_id',
						name: '3 John',
						recordings: {
							nodes: [],
						},
					},
				],
			},
		});
}

describe('songs list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('renders', async () => {
		loadData();

		await renderPage();

		expect(fetchApi).toBeCalledWith(GetSongAlbumsListPageDataDocument, {
			variables: {
				language: 'ENGLISH',
			},
		});
	});

	it('lists albums', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_album_title')).toBeInTheDocument();
	});

	it('renders static paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/songs/albums');
	});

	it('links album entries', async () => {
		loadData();

		const { getByText } = await renderPage();

		const link = getByText('the_album_title').parentElement?.parentElement;

		expect(link).toHaveAttribute('href', 'the_album_path');
	});

	it('renders album list title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Albums')).toBeInTheDocument();
	});

	it('renders Bible book titles', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('3 John')).toBeInTheDocument();
	});

	it('slugifies Bible book urls', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('3 John').parentElement).toHaveAttribute(
			'href',
			'/en/songs/book/3-john'
		);
	});

	it('includes books tab title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Passage')).toBeInTheDocument();
	});
});
