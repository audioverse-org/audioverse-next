import { when } from 'jest-when';

import {
	GetSeriesListPageDataDocument,
	GetSeriesListPathsDataDocument,
} from '@lib/generated/graphql';
import { buildLoader, buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import SeriesList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/series/page/[i]';

const renderPage = buildRenderer(SeriesList, getStaticProps, {
	language: 'en',
	i: '1',
});

const loadData = buildLoader(GetSeriesListPageDataDocument, {
	serieses: {
		nodes: [{ id: 'the_series_id', title: 'the_series_title' }],
	},
	aggregate: {
		count: 1,
	},
});

describe('series list page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSeriesListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				serieses: {
					aggregate: {
						count: 1,
					},
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/series/page/1');
	});

	it('lists series', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_series_title')).toHaveAttribute(
			'href',
			'/en/series/the_series_id'
		);
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Series')).toBeInTheDocument();
	});

	it('links pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute('href', '/en/series/page/1');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSeriesListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});
});
