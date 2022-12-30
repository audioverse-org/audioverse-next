import { __loadQuery } from 'next/router';

import { fetchApi, __load, __loadReject } from '@lib/api/fetchApi';
import {
	GetSponsorListPageDataDocument,
	GetSponsorListPathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Sponsors, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/letter/[letter]';

const renderPage = buildStaticRenderer(Sponsors, getStaticProps);

function loadData() {
	__load(GetSponsorListPageDataDocument, {
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

		const { getByText } = await renderPage();

		expect(getByText('All Sponsors')).toBeInTheDocument();
	});

	it('lists sponsors', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		__load(GetSponsorListPathsDataDocument, {
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

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title').parentElement).toHaveAttribute(
			'href',
			'the_sponsor_path'
		);
	});

	it('renders 404', async () => {
		__loadReject(GetSponsorListPageDataDocument, 'oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});
});
