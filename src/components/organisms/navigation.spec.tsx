import { screen } from '@testing-library/react';
import React from 'react';

import Navigation from '@components/organisms/navigation';
import { loadRouter, renderWithIntl } from '@lib/test/helpers';

jest.mock('@lib/api/fetchApi');

const renderNavigation = async () => {
	return renderWithIntl(
		<Navigation
			onExit={() => void 0}
			searchTerm=""
			onSearchChange={() => void 0}
		/>
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
