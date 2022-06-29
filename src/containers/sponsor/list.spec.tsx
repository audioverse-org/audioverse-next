import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import {
	GetSponsorListPageDataDocument,
	GetSponsorListPathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Sponsors, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/letter/[letter]';
import { screen } from '@testing-library/react';

const renderPage = buildStaticRenderer(Sponsors, getStaticProps);

function loadData() {
	when(fetchApi)
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
			sponsorLetterCounts: [
				{
					letter: 'A',
				},
			],
		});
}

describe('sponsor list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('renders page title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('All Sponsors')).toBeInTheDocument();
	});

	it('lists sponsors', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		when(fetchApi)
			.calledWith(GetSponsorListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsorLetterCounts: [
					{
						letter: 'A',
					},
				],
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/letter/A');
	});

	it('links entries', async () => {
		loadData();

		await renderPage();

		expect(
			screen.getByRole('link', { name: 'the_sponsor_title' })
		).toHaveAttribute('href', 'the_sponsor_path');
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetSponsorListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});
});
