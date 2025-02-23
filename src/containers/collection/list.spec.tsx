import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '~lib/api/fetchApi';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import CollectionList, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/conferences/page/[i]';
import { ENTRIES_PER_PAGE } from '~src/lib/constants';

import {
	GetCollectionListPageDataDocument,
	GetCollectionListPathsDataDocument,
} from './__generated__/list';

const renderPage = buildStaticRenderer(CollectionList, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetCollectionListPageDataDocument, expect.anything())
		.mockResolvedValue({
			conferences: {
				nodes: [
					{
						id: 'the_conference_id',
						title: 'the_conference_title',
						canonicalPath: 'the_conference_path',
						imageWithFallback: {
							url: 'the_conference_image',
						},
						sponsor: {
							title: 'the_conference_sponsor',
						},
						allSequences: {
							aggregate: {
								count: 0,
							},
						},
						allRecordings: {
							aggregate: {
								count: 0,
							},
						},
					},
				],
			},
		});
}

describe('conference list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('renders', async () => {
		loadData();

		await renderPage();

		expect(fetchApi).toBeCalledWith(GetCollectionListPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				first: ENTRIES_PER_PAGE,
				offset: 0,
			},
		});
	});

	it('lists conferences', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetCollectionListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				conferences: {
					aggregate: {
						count: 1,
					},
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/conferences/page/1');
	});

	it('links entries', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_title').parentElement).toHaveAttribute(
			'href',
			'the_conference_path',
		);
	});

	it('renders pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute('href', '/en/conferences');
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetCollectionListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('All Conferences')).toBeInTheDocument();
	});
});
