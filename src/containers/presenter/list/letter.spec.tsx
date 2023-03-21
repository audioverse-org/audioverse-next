import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '@lib/api/fetchApi';
import {
	GetPersonListLetterCountsDocument,
	GetPresenterListLetterPageDataDocument,
} from '@lib/generated/graphql';
import { buildStaticRenderer } from '@lib/test/buildStaticRenderer';
import Presenters, {
	getStaticPaths,
	getStaticProps,
} from '@pages/[language]/presenters/letter/[letter]';
import { screen } from '@testing-library/react';

const renderPage = buildStaticRenderer(Presenters, getStaticProps);

function loadData() {
	when(fetchApi)
		.calledWith(GetPresenterListLetterPageDataDocument, expect.anything())
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
		loadData();
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('renders 404', async () => {
		when(fetchApi)
			.calledWith(GetPresenterListLetterPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		await renderPage();

		expect(screen.getByText('Sorry!')).toBeInTheDocument();
	});

	it('lists presenters', async () => {
		await renderPage();

		expect(
			screen.getByText('the_person_surname, the_person_givenName')
		).toBeInTheDocument();
	});

	it('generates static paths', async () => {
		when(fetchApi)
			.calledWith(GetPersonListLetterCountsDocument, expect.anything())
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
		await renderPage();

		const link = screen.getByRole('link', {
			name: /the_person_surname, the_person_givenName/,
		});

		expect(link).toHaveAttribute('href', 'the_person_path');
	});

	it('includes presenter images', async () => {
		await renderPage();

		expect(
			screen.getByAltText('the_person_surname, the_person_givenName')
		).toHaveAttribute('src', 'the_person_image');
	});

	it('renders page title', async () => {
		await renderPage();

		expect(screen.getByText('All Presenters')).toBeInTheDocument();
	});

	// TODO: Consider adding RSS feed
});
