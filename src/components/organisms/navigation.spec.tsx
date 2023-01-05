import { screen } from '@testing-library/react';
import { __loadRouter } from 'next/router';
import React from 'react';

import Navigation from '@components/organisms/navigation';
import renderWithProviders from '@lib/test/renderWithProviders';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@lib/api/fetchApi');

const renderNavigation = async () => {
	return renderWithProviders(
		<Navigation
			onExit={() => void 0}
			searchTerm=""
			onSearchChange={() => void 0}
		/>,
		undefined
	);
};

describe('navigation', () => {
	it('sets active class on active link', async () => {
		__loadRouter({
			asPath: '/en/discover',
		});

		await renderNavigation();

		await screen.findByText('Download App');

		// expect(screen.getByText('Discover').parentElement).toHaveClass('active');

		expect(
			screen.getByRole('link', {
				name: 'Discover',
			})
		).toHaveAttribute('aria-current', 'page');
	});
});
