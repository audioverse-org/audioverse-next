import { when } from 'jest-when';

import {
	GetCollectionDetailPageDataDocument,
	GetCollectionDetailPathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import writeFeedFile from '@lib/writeFeedFile';
import CollectionDetail, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/collections/[id]/[[...slug]]';

jest.mock('@lib/writeFeedFile');

const renderPage = buildStaticRenderer(CollectionDetail, getStaticProps, {
	language: 'en',
	id: 'the_collection_id',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetCollectionDetailPageDataDocument, expect.anything())
		.mockResolvedValue({
			collection: {
				id: 'the_collection_id',
				title: 'the_collection_title',
				startDate: '2007-12-19',
				endDate: '2007-12-23',
				sponsor: {
					id: 'the_sponsor_id',
					title: 'the_sponsor_title',
				},
				sequences: {
					nodes: [
						{
							id: 'the_sequence_id',
							title: 'the_sequence_title',
						},
					],
				},
			},
		});
}

describe('collection detail page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetCollectionDetailPageDataDocument, {
			variables: {
				id: 'the_collection_id',
			},
		});
	});

	it('lists sequences', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sequence_title')).toBeInTheDocument();
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_collection_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetCollectionDetailPathsDataDocument, expect.anything())
			.mockResolvedValue({
				collections: {
					nodes: [{ id: 'the_collection_id' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/conferences/the_collection_id/page/1');
	});

	it('renders sponsor link', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id'
		);
	});

	it('renders pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/conferences/the_collection_id/page/1'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetCollectionDetailPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('renders conference dates', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('2007-12-19 — 2007-12-23')).toBeInTheDocument();
	});

	it('creates RSS feed', async () => {
		loadData();

		await getStaticProps({
			params: { language: 'en', id: 'the_collection_id', i: '1' },
		});

		expect(writeFeedFile).toBeCalledWith({
			recordings: expect.any(Array),
			projectRelativePath: 'public/en/conferences/the_collection_id.xml',
			title: 'the_collection_title : AudioVerse',
		});
	});

	it('links to RSS feed', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('RSS')).toHaveAttribute(
			'href',
			'/en/conferences/the_collection_id.xml'
		);
	});
});
