import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { SequenceContentType } from '@src/__generated__/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import SeriesList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/series/page/[i]';
import { screen } from '@testing-library/react';
import {
	GetSeriesListPageDataDocument,
	GetSeriesListPathsDataDocument,
} from '@containers/series/__generated__/list';

const renderPage = buildStaticRenderer(SeriesList, getStaticProps);

const loadData = buildLoader(GetSeriesListPageDataDocument, {
	serieses: {
		nodes: [
			{
				id: 'the_series_id',
				title: 'the_series_title',
				contentType: SequenceContentType.Series,
				canonicalPath: 'the_series_path',
				speakers: [],
				allRecordings: {
					aggregate: {
						count: 0,
					},
				},
			},
		],
	},
	aggregate: {
		count: 1,
	},
});

describe('series list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('generates static paths', async () => {
		when(fetchApi)
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

		await renderPage();

		expect(
			screen.getByRole('link', { name: /the_series_title/ })
		).toHaveAttribute('href', 'the_series_path');
	});

	it('renders page title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('Series')).toBeInTheDocument();
	});

	it('links pagination', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('1')).toHaveAttribute('href', '/en/series');
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetSeriesListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});
});
