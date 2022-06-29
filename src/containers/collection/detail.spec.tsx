import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import {
	GetCollectionDetailPageDataDocument,
	GetCollectionDetailPathsDataDocument,
	Language,
	SequenceContentType,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import CollectionDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/conferences/[id]/[[...slug]]';
import { screen } from '@testing-library/react';

const renderPage = buildStaticRenderer(CollectionDetail, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetCollectionDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			collection: {
				id: 'the_collection_id',
				title: 'the_collection_title',
				startDate: '2007-12-19',
				endDate: '2007-12-23',
				language: Language.English,
				sponsor: {
					id: 'the_sponsor_id',
					title: 'the_sponsor_title',
					canonicalPath: 'the_sponsor_path',
					imageWithFallback: {
						url: 'the_sponsor_image_url',
					},
				},
				persons: {
					aggregate: {
						count: 1,
					},
					nodes: [
						{
							id: 'the_person_id',
							name: 'the_person_name',
							canonicalPath: 'the_person_url',
							imageWithFallback: {
								url: 'the_person_image_url',
							},
							recordings: {
								aggregate: {
									count: 0,
								},
							},
						},
					],
					pageInfo: {
						hasNextPage: false,
					},
				},
				sequences: {
					aggregate: {
						count: 1,
					},
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
					pageInfo: {
						hasNextPage: false,
					},
				},
				recordings: {
					nodes: [],
					pageInfo: {
						hasNextPage: false,
					},
				},
			},
		});
}

describe('collection detail page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			id: 'the_collection_id',
		});
	});

	it('renders', async () => {
		loadData();

		await renderPage();

		expect(fetchApi).toBeCalledWith(GetCollectionDetailPageDataDocument, {
			variables: {
				id: 'the_collection_id',
			},
		});
	});

	it('lists sequences', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_sequence_title')).toBeInTheDocument();
	});

	it('renders page title', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('the_collection_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetCollectionDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				collections: {
					nodes: [{ canonicalPath: '/the_collection_path' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/the_collection_path');
	});

	it('renders sponsor link', async () => {
		loadData();

		await renderPage();

		expect(screen.getAllByText('the_sponsor_title')[1]).toHaveAttribute(
			'href',
			'the_sponsor_path'
		);
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetCollectionDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('renders conference dates', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('Dec 19 – 23, 2007')).toBeInTheDocument();
	});

	it('links to RSS feed', async () => {
		loadData();

		await renderPage();

		expect(screen.getByText('Copy RSS Link')).toHaveAttribute(
			'href',
			'/en/conferences/the_collection_id/feed.xml'
		);
	});
});
