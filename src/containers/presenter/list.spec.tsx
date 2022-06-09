import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import {
	GetPresenterListPageDataDocument,
	GetPresenterListPathsDataDocument,
} from '@containers/presenter/list.gql';
import { fetchApi } from '@lib/api/fetchApi';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Presenters, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/presenters/letter/[letter]';

const renderPage = buildStaticRenderer(Presenters, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetPresenterListPageDataDocument, expect.anything())
		.mockResolvedValue({
			persons: {
				nodes: [
					{
						id: 'the_person_id',
						surname: 'the_person_surname',
						givenName: 'the_person_givenName',
						canonicalPath: 'the_person_path',
						summary: 'the_person_summary',
						image: {
							url: 'the_person_image',
						},
						recordings: {
							aggregate: {
								count: 0,
							},
						},
					},
				],
			},
			personLetterCounts: [
				{
					letter: 'A',
				},
			],
		});
}

describe('presenter list page', () => {
	beforeEach(() => {
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetPresenterListPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();
	});

	it('lists presenters', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(
			getByText('the_person_surname, the_person_givenName')
		).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetPresenterListPathsDataDocument, expect.anything())
			.mockResolvedValue({
				personLetterCounts: [
					{
						letter: 'A',
					},
				],
			});

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/presenters/letter/A');
	});

	it('links presenters', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(
			getByText('the_person_surname, the_person_givenName').parentElement
				?.parentElement
		).toHaveAttribute('href', '/the_person_path');
	});

	it('includes presenter images', async () => {
		loadData();

		const { getByAltText } = await renderPage();

		expect(
			getByAltText('the_person_surname, the_person_givenName')
		).toHaveAttribute('src', 'the_person_image');
	});

	it('renders page title', async () => {
		loadData();

		const { getByText } = await renderPage();

		expect(getByText('All Presenters')).toBeInTheDocument();
	});

	// TODO: Consider adding RSS feed
});
