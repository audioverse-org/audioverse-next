import {
	GetSeriesDetailDataDocument,
	GetSeriesDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { mockedFetchApi, renderWithIntl } from '@lib/test/helpers';
import SeriesDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/series/[id]';

async function renderPage() {
	const { props } = await getStaticProps({ params: { id: 'series_id' } });
	return renderWithIntl(SeriesDetail, props);
}

describe('series detail page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('gets series data', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetSeriesDetailDataDocument, {
			variables: {
				id: 'series_id',
			},
		});
	});

	it('renders title', async () => {
		mockedFetchApi.mockResolvedValue({
			series: {
				title: 'the_series_title',
			},
		});

		const { getByText } = await renderPage();

		expect(getByText('the_series_title')).toBeInTheDocument();
	});

	it('renders 404', async () => {
		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('gets static path data', async () => {
		await getStaticPaths();

		expect(mockedFetchApi).toBeCalledWith(GetSeriesDetailPathsDataDocument, {
			variables: {
				language: 'ENGLISH',
				first: 1000,
			},
		});
	});

	it('gets static path data for all languages', async () => {
		await getStaticPaths();

		expect(mockedFetchApi).toBeCalledWith(GetSeriesDetailPathsDataDocument, {
			variables: {
				language: 'SPANISH',
				first: 1000,
			},
		});
	});

	it('returns static paths', async () => {
		mockedFetchApi.mockResolvedValue({
			serieses: {
				nodes: [
					{
						id: 'the_series_id',
					},
				],
			},
		});

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/series/the_series_id');
	});
});
