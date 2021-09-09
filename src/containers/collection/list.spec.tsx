import { when } from 'jest-when';

import {
	GetCollectionListPageDataDocument,
	GetCollectionListPathsDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer, mockedFetchApi } from '@lib/test/helpers';
import CollectionList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/conferences/page/[i]';

const renderPage = buildStaticRenderer(CollectionList, getStaticProps, {
	language: 'en',
	i: '1',
});

function loadData() {
	when(mockedFetchApi)
		.calledWith(GetCollectionListPageDataDocument, expect.anything())
		.mockResolvedValue({
			collections: {
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
					},
				],
			},
		});
}

describe('conference list page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(
			GetCollectionListPageDataDocument,
			expect.anything()
		);
	});

	it('lists conferences', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_conference_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetCollectionListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				collections: {
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
			'/the_conference_path'
		);
	});

	it('renders pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute('href', '/en/conferences/page/1');
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetCollectionListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Conferences')).toBeInTheDocument();
	});
});
