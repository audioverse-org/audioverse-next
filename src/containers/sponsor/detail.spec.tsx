import { when } from 'jest-when';

import {
	GetSponsorDetailPageDataDocument,
	GetSponsorDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import SponsorDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]';

const renderPage = buildStaticRenderer(SponsorDetail, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetSponsorDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			sponsor: {
				id: 'the_sponsor_id',
				title: 'the_sponsor_title',
				imageWithFallback: {
					url: 'the_sponsor_image',
				},
				location: 'the_sponsor_location',
				website: 'the_sponsor_website',
				summary: 'the_sponsor_summary',
				description: '<i>the</i> <b>description</b>',
				collections: {
					nodes: [],
					aggregate: {
						count: 0,
					},
				},
			},
		});
}

describe('sponsor detail page', () => {
	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [{ id: 'the_sponsor_id' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/the_sponsor_id');
	});

	it('displays sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('displays sponsor image', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('displays location', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_location')).toBeInTheDocument();
	});

	it('displays website', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_website')).toBeInTheDocument();
	});

	it('renders description html', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('description')).toBeInTheDocument();
	});
});

// TODO:
// link to sub pages
// don't link to sub pages if no sub entities exist
// use something other than nodes.length to trigger 404
