import { __loadQuery } from 'next/router';

import { fetchApi } from '@/lib/api/fetchApi';
import {
	GetSeriesDetailPageDataDocument,
	GetSeriesDetailPathsDataDocument,
	Language,
	RecordingContentType,
	SequenceContentType,
} from '@/lib/generated/graphql';
import { buildLoader } from '@/lib/test/buildLoader';
import { buildStaticRenderer } from '@/lib/test/buildStaticRenderer';
import SeriesDetail, {
	getStaticPaths,
	getStaticProps,
} from '@/pages/[language]/series/[id]/[[...slug]]';
import { beforeEach, describe, expect, it, Mock } from 'vitest';

const renderPage = buildStaticRenderer(SeriesDetail, getStaticProps);

const loadData = buildLoader(GetSeriesDetailPageDataDocument, {
	series: {
		id: 'the_series_id',
		title: 'the_series_title',
		contentType: SequenceContentType.Series,
		language: Language.English,
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
					recordingContentType: RecordingContentType.Sermon,
					persons: [],
				},
			],
			aggregate: { count: 1 },
		},
	},
});

const loadPaths = buildLoader(GetSeriesDetailPathsDataDocument, {
	serieses: {
		nodes: [],
	},
});

describe('series detail page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_series_id',
		});
		loadPaths();
	});

	it('gets series data', async () => {
		loadData();

		await renderPage();

		expect(fetchApi).toBeCalledWith(GetSeriesDetailPageDataDocument, {
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
		(fetchApi as Mock).mockRejectedValueOnce(undefined);

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});

	it('gets static path data', async () => {
		await getStaticPaths();

		expect(fetchApi).toBeCalledWith(GetSeriesDetailPathsDataDocument, {
			variables: {
				language: 'ENGLISH',
				first: 10,
			},
		});
	});

	it('gets static path data for all languages', async () => {
		await getStaticPaths();

		expect(fetchApi).toBeCalledWith(GetSeriesDetailPathsDataDocument, {
			variables: {
				language: 'SPANISH',
				first: 10,
			},
		});
	});

	it('returns static paths', async () => {
		(fetchApi as Mock).mockResolvedValue({
			serieses: {
				nodes: [
					{
						canonicalPath: '/en/series/the_series_path',
					},
				],
			},
		});

		const result = await getStaticPaths();

		expect(result.paths).toContain('/en/series/the_series_path');
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
			'the_sponsor_path'
		);
	});

	it('links to conference', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_title')).toHaveAttribute(
			'href',
			'the_conference_path'
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

	it('links rss feed', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Copy RSS Link')).toHaveAttribute(
			'href',
			'/en/series/the_series_id/feed.xml'
		);
	});
});
