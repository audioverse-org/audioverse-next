import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import {
	GetSponsorSeriesPageDataDocument,
	GetSponsorSeriesPathsDataDocument,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildLoader } from '@lib/test/buildLoader';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import SponsorSeries, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/series/page/[i]';
import { screen } from '@testing-library/react';

const renderPage = buildStaticRenderer(SponsorSeries, getStaticProps);

const loadData = buildLoader(GetSponsorSeriesPageDataDocument, {
	sponsor: {
		id: 'the_sponsor_id',
		title: 'the_sponsor_title',
		canonicalPath: 'the_sponsor_path',
		image: {
			url: 'the_sponsor_image',
		},
	},
	sequences: {
		nodes: [
			{
				id: 'the_series_id',
				title: 'the_series_title',
				canonicalPath: 'the_series_path',
				contentType: SequenceContentType.Series,
				speakers: [],
				allRecordings: {
					aggregate: {
						count: 0,
					},
				},
			},
		],
		aggregate: {
			count: 100,
		},
	},
});

describe('sponsor series page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_sponsor_id',
			i: '1',
		});
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetSponsorSeriesPathsDataDocument, expect.anything())
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

		expect(paths).toContain('/en/sponsors/the_sponsor_id/series/page/1');
	});

	it('renders sponsor image', async () => {
		loadData();

		await renderPage();

		expect(screen.getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image'
		);
	});

	it('skips sponsor image if none provided', async () => {
		loadData({
			data: {
				sponsor: {
					image: null as any,
				},
			},
		});

		await renderPage();

		expect(screen.queryByAltText('the_sponsor_title')).not.toBeInTheDocument();
	});

	it('renders sponsor title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('renders page subtitle', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('Series')).toBeInTheDocument();
	});

	it('lists series', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_series_title')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('1')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/series'
		);
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetSponsorSeriesPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});
});
