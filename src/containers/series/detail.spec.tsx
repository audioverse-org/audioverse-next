import {
	GetSeriesDetailDataDocument,
	GetSeriesDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { buildLoader, buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import SeriesDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/series/[id]/page/[i]';

const renderPage = buildRenderer(SeriesDetail, getStaticProps, {
	language: 'en',
	id: 'the_series_id',
	i: '1',
});

const loadData = buildLoader(GetSeriesDetailDataDocument, {
	series: {
		title: 'the_series_title',
		imageWithFallback: {
			url: 'the_series_image',
		},
		sponsor: {
			id: 'the_sponsor_id',
			title: 'the_sponsor_title',
		},
		collection: {
			id: 'the_conference_id',
			title: 'the_conference_title',
		},
		recordings: {
			nodes: [{ id: 'the_recording_id', title: 'the_recording_title' }],
			aggregate: { count: 1 },
		},
	},
});

describe('series detail page', () => {
	it('gets series data', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetSeriesDetailDataDocument, {
			variables: {
				id: 'the_series_id',
				offset: 0,
				first: 25,
			},
		});
	});

	it('renders title', async () => {
		loadData();

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
				first: 500,
			},
		});
	});

	it('gets static path data for all languages', async () => {
		await getStaticPaths();

		expect(mockedFetchApi).toBeCalledWith(GetSeriesDetailPathsDataDocument, {
			variables: {
				language: 'SPANISH',
				first: 500,
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

		expect(result.paths).toContain('/en/series/the_series_id/page/1');
	});

	it('lists recordings', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_recording_title')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/series/the_series_id/page/1'
		);
	});

	it('renders series image', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_series_title')).toHaveAttribute(
			'src',
			'the_series_image'
		);
	});

	it('links to sponsor', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Sponsor: the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id'
		);
	});

	it('links to conference', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Conference: the_conference_title')).toHaveAttribute(
			'href',
			'/en/conferences/the_conference_id/page/1'
		);
	});

	it('skips rendering conference link if no conference', async () => {
		loadData({ series: { collection: { id: null as any, title: '' } } });

		const { queryByText } = await renderPage();

		expect(queryByText('Conference:')).not.toBeInTheDocument();
	});
});

// link to sponsor
// link to conference
