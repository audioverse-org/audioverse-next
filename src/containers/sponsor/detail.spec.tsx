import { __loadQuery } from 'next/router';

import { fetchApi, __load, __loadReject } from '@lib/api/fetchApi';
import {
	GetSponsorDetailPageDataDocument,
	GetSponsorDetailPathsDataDocument,
	Language,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import SponsorDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/[[...slugs]]';
import { describe, it, expect, beforeEach } from 'vitest';

const renderPage = buildStaticRenderer(SponsorDetail, getStaticProps);

function loadData() {
	__load(GetSponsorDetailPageDataDocument, {
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
		__load(GetSponsorDetailPathsDataDocument, {
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
			'the_sponsor_image'
		);
	});

	it('renders 404', async () => {
		__loadReject(GetSponsorDetailPageDataDocument, 'oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
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
