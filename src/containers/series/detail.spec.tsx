import {
	GetSeriesDetailPageDataDocument,
	GetSeriesDetailPathsDataDocument,
	RecordingContentType,
} from '@lib/generated/graphql';
import {
	buildLoader,
	buildStaticRenderer,
	mockedFetchApi,
} from '@lib/test/helpers';
import writeFeedFile from '@lib/writeFeedFile';
import SeriesDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/series/[id]/[[...slug]]';

const renderPage = buildStaticRenderer(SeriesDetail, getStaticProps, {
	language: 'en',
	id: 'the_series_id',
});

jest.mock('@lib/writeFeedFile');

const loadData = buildLoader(GetSeriesDetailPageDataDocument, {
	series: {
		title: 'the_series_title',
		image: {
			url: 'the_series_image',
		},
		sponsor: {
			id: 'the_sponsor_id',
			title: 'the_sponsor_title',
			canonicalPath: 'the_sponsor_path',
		},
		collection: {
			id: 'the_conference_id',
			title: 'the_conference_title',
			canonicalPath: 'the_conference_path',
		},
		recordings: {
			nodes: [
				{
					id: 'the_recording_id',
					title: 'the_recording_title',
					canonicalPath: 'the_recording_path',
					contentType: RecordingContentType.Sermon,
					persons: [],
				},
			],
			aggregate: { count: 1 },
		},
	},
});

describe('series detail page', () => {
	it('gets series data', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetSeriesDetailPageDataDocument, {
			variables: {
				id: 'the_series_id',
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
				first: 200,
			},
		});
	});

	it('gets static path data for all languages', async () => {
		await getStaticPaths();

		expect(mockedFetchApi).toBeCalledWith(GetSeriesDetailPathsDataDocument, {
			variables: {
				language: 'SPANISH',
				first: 200,
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

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/the_sponsor_path'
		);
	});

	it('links to conference', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_title')).toHaveAttribute(
			'href',
			'/the_conference_path'
		);
	});

	it('skips rendering conference link if no conference', async () => {
		loadData({
			series: {
				collection: null as any,
			},
		});

		const { queryByText } = await renderPage();

		expect(queryByText('Conference')).not.toBeInTheDocument();
	});

	it('generates rss', async () => {
		loadData();

		await getStaticProps({
			params: { language: 'en', id: 'the_series_id' },
		});

		expect(writeFeedFile).toBeCalledWith({
			recordings: expect.anything(),
			title: 'the_series_title | AudioVerse English',
			projectRelativePath: 'public/en/series/the_series_id.xml',
		});
	});

	// TODO:
	// it('links rss feed', async () => {
	// 	loadData();

	// 	const { getByText } = await renderPage();

	// 	expect(getByText('RSS')).toHaveAttribute(
	// 		'href',
	// 		'/en/series/the_series_id.xml'
	// 	);
	// });
});
