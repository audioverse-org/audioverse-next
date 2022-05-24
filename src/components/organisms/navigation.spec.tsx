import { screen } from '@testing-library/react';
import React from 'react';

import Navigation from '@components/organisms/navigation';
import { loadRouter } from '@lib/test/helpers';
import renderWithProviders from '@lib/test/renderWithProviders';

jest.mock('@lib/api/fetchApi');

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
		loadRouter({
			asPath: '/en/discover',
		});

		await renderNavigation();

		await screen.findByText('Download App');

		expect(screen.getByText('Discover').parentElement).toHaveClass('active');
	});
});
