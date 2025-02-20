import { screen } from '@testing-library/react';
import { when } from 'jest-when';
import { __loadQuery } from 'next/router';

import { fetchApi } from '~lib/api/fetchApi';
import { buildLoader } from '~lib/test/buildLoader';
import { buildStaticRenderer } from '~lib/test/buildStaticRenderer';
import Sponsors, {
	getStaticPaths,
	getStaticProps,
} from '~pages/[language]/sponsors/letter/[letter]';

import { GetSponsorListLetterPageDataDocument } from './__generated__/letter';
import { GetSponsorListLetterCountsDocument } from './__generated__/list';

const renderPage = buildStaticRenderer(Sponsors, getStaticProps);

const loadData = buildLoader(GetSponsorListLetterPageDataDocument, {
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

const loadPathsData = buildLoader(GetSponsorListLetterCountsDocument, {
	sponsorLetterCounts: [
		{
			letter: 'A',
		},
	],
});

describe('sponsor list page', () => {
	beforeEach(() => {
		loadData();
		__loadQuery({
			language: 'en',
			i: '1',
		});
	});

	it('renders page title', async () => {
		await renderPage();

		expect(screen.getByText('All Sponsors')).toBeInTheDocument();
	});

	it('lists sponsors', async () => {
		await renderPage();

		expect(screen.getByText('the_sponsor_title')).toBeInTheDocument();
	});

	it('generates paths', async () => {
		loadPathsData();

		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/sponsors/letter/A');
	});

	it('links entries', async () => {
		await renderPage();

		const link = screen.getByRole('link', {
			name: 'the_sponsor_title',
		});

		expect(link).toHaveAttribute('href', 'the_sponsor_path');
	});

	it('renders 404', async () => {
		// Mock console for expected error
		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
		const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

		when(fetchApi)
			.calledWith(GetSponsorListLetterPageDataDocument, expect.anything())
			.mockRejectedValue('oops');

		const { getByText } = await renderPage();

		expect(getByText('Sorry!')).toBeInTheDocument();

		consoleError.mockRestore();
		consoleLog.mockRestore();
	});
});
