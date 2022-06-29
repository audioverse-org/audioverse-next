import React from 'react';

import Header from '@components/organisms/header';
import renderWithProviders from '@lib/test/renderWithProviders';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __nextLink } from 'next/link';

jest.mock('@lib/api/fetchApi');

const renderComponent = async () => {
	return renderWithProviders(<Header />, undefined);
};

describe('header', () => {
	it('has title', async () => {
		await renderComponent();

		expect(screen.getByAltText('AudioVerse')).toBeInTheDocument();
	});

	it('links logo', async () => {
		await renderComponent();

		const logo = screen.getByAltText('AudioVerse');

		userEvent.click(logo);

		expect(__nextLink).toHaveBeenCalledWith(
			expect.objectContaining({
				props: expect.objectContaining({
					href: '/en',
				}),
			})
		);
	});
});
