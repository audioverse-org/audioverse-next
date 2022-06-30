import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import { Language, SequenceContentType } from '@src/__generated__/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import SponsorDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/[[...slugs]]';
import { screen } from '@testing-library/react';
import {
	GetSponsorDetailPageDataDocument,
	GetSponsorDetailPathsDataDocument,
} from '@containers/sponsor/__generated__/detail';

const renderPage = buildStaticRenderer(SponsorDetail, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetSponsorDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			sponsor: {
				id: 'the_sponsor_id',
				title: 'the_sponsor_title',
				image: {
					url: 'the_sponsor_image',
				},
				location: 'the_sponsor_location',
				website: 'the_sponsor_website',
				summary: 'the_sponsor_summary',
				description: '<i>the</i> <b>description</b>',
				language: Language.English,
				collections: {
					nodes: [],
					aggregate: {
						count: 0,
					},
				},
				sequences: {
					nodes: [
						{
							id: 'the_sequence_id',
							title: 'the_sequence_title',
							contentType: SequenceContentType.Series,
							canonicalPath: 'the_sequence_path',
							allRecordings: {
								aggregate: {
									count: 1,
								},
							},
							speakers: [],
						},
					],
				},
				recordings: {
					nodes: [],
				},
			},
		});
}

describe('sponsor detail page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_sponsor_id',
		});
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetSponsorDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [{ canonicalPath: '/the_sponsor_path' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/the_sponsor_path');
	});

	it('displays sponsor title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('displays sponsor image', async () => {
		loadData();

		await renderPage();

		expect(screen.getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image'
		);
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetSponsorDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('displays location', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_sponsor_location')).toBeInTheDocument();
	});

	it('displays website', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_sponsor_website')).toBeInTheDocument();
	});

	it('renders description html', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('description')).toBeInTheDocument();
	});
});

// TODO:
// link to sub pages
// don't link to sub pages if no sub entities exist
// use something other than nodes.length to trigger 404
