import { when } from 'jest-when';

import {
	GetSponsorListPageDataDocument,
	GetSponsorListPathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import Sponsors, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/page/[i]';

const renderPage = buildStaticRenderer(Sponsors, getStaticProps, {
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
						canonicalPath: 'the_sponsor_path',
						imageWithFallback: {
							url: 'the_sponsor_image',
						},
						collections: {
							aggregate: {
								count: 1,
							},
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

		expect(getByText('All Sponsors')).toBeInTheDocument();
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

		expect(getByText('the_sponsor_title').parentElement).toHaveAttribute(
			'href',
			'/the_sponsor_path'
		);
	});

	it('links pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute('href', '/en/sponsors');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
