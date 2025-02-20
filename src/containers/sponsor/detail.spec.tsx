import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '~lib/api/fetchApi';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import SponsorDetail, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/sponsors/[id]/[[...slugs]]';
import { Language, SequenceContentType } from '~src/__generated__/graphql';

import {
	GetSponsorDetailPageDataDocument,
	GetSponsorDetailPathsDataDocument,
} from './__generated__/detail';

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
							sequenceSpeakers: [],
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
					nodes: [{ canonicalPath: 'the_sponsor_path' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('the_sponsor_path');
	});

	it('displays sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('displays sponsor image', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image',
		);
	});

	it('renders 404', async () => {
		// Mock console for expected error
		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
		const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

		when(fetchApi)
			.calledWith(GetSponsorDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();

		consoleError.mockRestore();
		consoleLog.mockRestore();
	});

	it('displays location', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_location')).toBeInTheDocument();
	});

	it('displays website', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_website')).toBeInTheDocument();
	});

	it('renders description html', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('description')).toBeInTheDocument();
	});
});

// TODO:
// link to sub pages
// don't link to sub pages if no sub entities exist
// use something other than nodes.length to trigger 404
