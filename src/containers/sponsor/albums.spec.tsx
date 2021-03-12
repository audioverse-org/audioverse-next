import { when } from 'jest-when';

import {
	GetSponsorAlbumsPageDataDocument,
	GetSponsorAlbumsPathsDataDocument,
} from '@lib/generated/graphql';
import { buildLoader, buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import SponsorAlbums, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/albums/page/[i]';

const renderPage = buildRenderer(SponsorAlbums, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
	i: '1',
});

const loadData = buildLoader(GetSponsorAlbumsPageDataDocument, {
	sponsor: {
		title: 'the_sponsor_title',
	},
	musicAlbums: {
		nodes: [
			{
				id: 'the_album_id',
				title: 'the_album_title',
			},
		],
	},
});

describe('sponsor albums page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorAlbumsPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [
						{
							id: 'the_sponsor_id',
						},
					],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/the_sponsor_id/albums/page/1');
	});

	it('lists albums', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_album_title')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/albums/page/1'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorAlbumsPathsDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('renders sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('renders page subtitle', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Albums')).toBeInTheDocument();
	});

	it('links sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id'
		);
	});
});
