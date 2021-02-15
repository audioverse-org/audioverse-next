import { when } from 'jest-when';

import { GetSongsListPageDataDocument } from '@lib/generated/graphql';
import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import Songs, { getStaticPaths, getStaticProps } from '@pages/[language]/songs';

const renderPage = buildRenderer(Songs, getStaticProps, { language: 'en' });

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetSongsListPageDataDocument, expect.anything())
		.mockResolvedValue({
			musicAlbums: {
				nodes: [
					{
						id: 'the_album_id',
						title: 'the_album_title',
						imageWithFallback: {
							url: 'the_album_cover',
						},
						sponsor: {
							title: 'the_album_sponsor',
						},
					},
				],
			},
		});
}

describe('songs list page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetSongsListPageDataDocument, {
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

		expect(paths).toContain('/en/songs');
	});

	it('includes sponsor name', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_album_sponsor')).toBeInTheDocument();
	});

	it('includes album cover', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		const image = getByAltText('the_album_title') as HTMLImageElement;

		expect(image).toHaveAttribute('src', 'the_album_cover');
	});

	it('links album entries', async () => {
		loadData();

		const { getByText } = await renderPage();

		const link = getByText('the_album_title').parentElement;

		expect(link).toHaveAttribute('href', '/en/songs/album/the_album_id');
	});

	it('renders album list title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Albums')).toBeInTheDocument();
	});

	// renders 404
});
