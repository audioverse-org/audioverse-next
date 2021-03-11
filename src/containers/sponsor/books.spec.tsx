import { when } from 'jest-when';

import {
	GetSponsorBooksPageDataDocument,
	GetSponsorBooksPathsDataDocument,
} from '@lib/generated/graphql';
import { buildLoader, buildRenderer, mockedFetchApi } from '@lib/test/helpers';
import SponsorBooks, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/sponsors/[id]/books/page/[i]';

const renderPage = buildRenderer(SponsorBooks, getStaticProps, {
	language: 'en',
	id: 'the_sponsor_id',
	i: '1',
});

const loadData = buildLoader(GetSponsorBooksPageDataDocument, {
	sponsor: {
		id: 'the_sponsor_id',
		title: 'the_sponsor_title',
		imageWithFallback: {
			url: 'the_sponsor_image',
		},
	},
	audiobooks: {
		nodes: [
			{
				id: 'the_book_id',
				title: 'the_book_title',
				imageWithFallback: {
					url: 'the_book_image',
				},
			},
		],
		aggregate: {
			count: 1,
		},
	},
});

describe('sponsor books list', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('lists books', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_book_title')).toBeInTheDocument();
	});

	it('renders list item images', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_book_title')).toHaveAttribute(
			'src',
			'the_book_image'
		);
	});

	it('skips missing list entry images', async () => {
		loadData({
			audiobooks: {
				nodes: [{ imageWithFallback: { url: null as any } }],
			},
		});

		const { queryByAltText } = await renderPage();

		expect(queryByAltText('the_book_title')).not.toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorBooksPathsDataDocument, expect.anything())
			.mockResolvedValue({
				sponsors: {
					nodes: [{ id: 'the_sponsor_id' }],
				},
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/the_sponsor_id/books/page/1');
	});

	it('links list items', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_book_title')).toHaveAttribute(
			'href',
			'/en/books/the_book_id'
		);
	});

	it('renders sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('links sponsor title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('the_sponsor_title')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id'
		);
	});

	it('renders subpage title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('Books')).toBeInTheDocument();
	});

	it('links pagination properly', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('1')).toHaveAttribute(
			'href',
			'/en/sponsors/the_sponsor_id/books/page/1'
		);
	});

	it('renders 404', async () => {
		when(mockedFetchApi)
			.calledWith(GetSponsorBooksPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('404')).toBeInTheDocument();
	});

	it('renders sponsor image', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(getByAltText('the_sponsor_title')).toHaveAttribute(
			'src',
			'the_sponsor_image'
		);
	});

	it('skips missing sponsor image', async () => {
		loadData({
			sponsor: { imageWithFallback: { url: null as any } },
		});

		const { queryByAltText } = await renderPage();

		expect(queryByAltText('the_sponsor_title')).not.toBeInTheDocument();
	});
});
