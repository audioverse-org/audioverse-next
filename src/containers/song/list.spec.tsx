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
			sponsors: {
				nodes: [
					{
						id: 'the_sponsor_id',
						title: 'the_sponsor_title',
						imageWithFallback: {
							url: 'the_sponsor_image',
						},
					},
				],
			},
			musicMoodTags: {
				nodes: [
					{
						id: 'the_tag_id',
						name: 'the_tag_name',
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

	it('renders Bible book titles', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Genesis')).toBeInTheDocument();
	});

	it('links Bible book titles', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Genesis')).toHaveAttribute(
			'href',
			'/en/songs/book/Genesis'
		);
	});

	it('slugifies Bible book urls', async () => {
		const { getByText } = await renderPage();

		expect(getByText('3 John')).toHaveAttribute(
			'href',
			'/en/songs/book/3-John'
		);
	});

	it('includes books tab title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Books')).toBeInTheDocument();
	});

	it('lists sponsors', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('includes sponsor image', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image'
		);
	});

	it('links sponsor entries', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/songs/sponsor/the_sponsor_id'
		);
	});

	it('lists tags', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_tag_name')).toBeInTheDocument();
	});

	it('links tags', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_tag_name')).toHaveAttribute(
			'href',
			'/en/songs/tag/the_tag_name'
		);
	});

	it('slugifies tag routes', async () => {
		when(mockedFetchApi)
			.calledWith(GetSongsListPageDataDocument, expect.anything())
			.mockResolvedValue({
				musicMoodTags: {
					nodes: [
						{
							id: 'the_tag_id',
							name: 'the tag name',
						},
					],
				},
			});

		const { getByText } = await renderPage();

		expect(getByText('the tag name')).toHaveAttribute(
			'href',
			'/en/songs/tag/the-tag-name'
		);
	});
});
