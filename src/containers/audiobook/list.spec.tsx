import { when } from 'jest-when';
import React from 'react';

import { ENTRIES_PER_PAGE } from '@lib/constants';
import {
	GetAudiobookListPageDataDocument,
	GetAudiobookListPageDataQuery,
	GetAudiobookListPathsDataDocument,
	SequenceContentType,
} from '@lib/generated/graphql';
import { loadRouter, mockedFetchApi, renderWithIntl } from '@lib/test/helpers';
import AudiobooksList, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/books/page/[i]';

async function renderPage(
	params: Partial<Parameters<typeof getStaticProps>[0]['params']> = {}
) {
	loadRouter({ query: params });

	const { props } = (await getStaticProps({
		params: { language: 'en', i: '1', ...params },
	})) as any;

	return renderWithIntl(<AudiobooksList {...props} />);
}

function loadData(data: Partial<GetAudiobookListPageDataQuery> = {}) {
	when(mockedFetchApi)
		.calledWith(GetAudiobookListPageDataDocument, expect.anything())
		.mockResolvedValue({
			audiobooks: {
				nodes: [
					{
						id: 'the_book_id',
						title: 'the_book_title',
						canonicalPath: 'the_book_path',
						contentType: SequenceContentType.Audiobook,
						sequenceWriters: [],
						allRecordings: {},
					},
				],
				aggregate: {
					count: 100,
				},
			},
			...data,
		});
}

describe('audiobook list page', () => {
	it('renders', async () => {
		await renderPage();

		expect(mockedFetchApi).toBeCalledWith(GetAudiobookListPageDataDocument, {
			variables: {
				language: 'ENGLISH',
				first: ENTRIES_PER_PAGE,
				offset: 0,
			},
		});
	});

	it('lists book titles', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_book_title')).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetAudiobookListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				audiobooks: {
					aggregate: {
						count: 1,
					},
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/books/page/1');
	});

	it('renders pagination', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		const link = getByText('1') as HTMLLinkElement;

		expect(link.href).toContain('/en/books/page/1');
	});

	it('localizes pagination links', async () => {
		loadData();

		const { getByText } = await renderPage({ language: 'es' });

		const link = getByText('1') as HTMLLinkElement;

		expect(link.href).toContain('/es/books/page/1');
	});

	it('renders 404', async () => {
		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});

	it('calculates page count correctly', async () => {
		loadData();

		const { queryByText } = await renderPage();

		expect(queryByText('0')).not.toBeInTheDocument();
	});

	it('links entries', async () => {
		loadData();

		const { getAllByRole } = await renderPage();

		const link = getAllByRole('link')[1] as HTMLLinkElement;

		expect(link.href).toContain('/the_book_path');
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('All Audiobooks')).toBeInTheDocument();
	});
});
