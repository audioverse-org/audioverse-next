import { buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import Sponsors, {
	getStaticProps,
	getStaticPaths,
} from '@pages/[language]/sponsors/page/[i]';
import { when } from 'jest-when';
import {
	GetSponsorListPageDataDocument,
	GetSponsorListPathsDataDocument,
} from '@lib/generated/graphql';

const renderPage = buildRenderer(Sponsors, getStaticProps, {
	language: 'en',
	i: '1',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetSponsorListPageDataDocument, expect.anything())
		.mockResolvedValue({
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
		});
}

describe('sponsor list page', () => {
	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Sponsors')).toBeInTheDocument();
	});

	it('lists sponsors', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					aggregate: {
						count: 1,
					},
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/page/1');
	});

	it('links entries', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/page/1'
		);
	});

	it('loads images', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image'
		);
	});

	it('links pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute('href', '/en/sponsors/page/1');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});
