import { __loadQuery } from 'next/router';
import React from 'react';

import renderWithProviders from '@lib/test/renderWithProviders';
import Search, { getStaticPaths } from '@pages/[language]/search';

import { screen, waitFor } from '@testing-library/react';

jest.mock('next/head');

const renderPage = async () => {
	return renderWithProviders(<Search />, undefined);
};

describe('search', () => {
	it('registers search paths', async () => {
		const { paths } = await getStaticPaths();

		expect(paths).toContain('/en/search');
	});

	it('includes search term in title', async () => {
		__loadQuery({
			q: 'test',
		});

		await renderPage();

		await waitFor(() => {
			expect(screen.getByTestId('head')).toHaveTextContent(
				'Search | "test" | AudioVerse'
			);
		});
	});

	it('omits search term if none provided', () => {
		__loadQuery({ q: '' });

		renderPage();

		expect(screen.getByTestId('head')).toHaveTextContent('Search | AudioVerse');
	});
});
