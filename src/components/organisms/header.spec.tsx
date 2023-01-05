import React from 'react';

import Header from '@components/organisms/header';
import renderWithProviders from '@lib/test/renderWithProviders';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@lib/api/fetchApi');

const renderHeader = async () => {
	return renderWithProviders(<Header />, undefined);
};

describe('header', () => {
	it('has title', async () => {
		const { getByAltText } = await renderHeader();

		expect(getByAltText('AudioVerse')).toBeInTheDocument();
	});

	it('links logo', async () => {
		await renderHeader();

		const link = screen.getByRole('link');

		expect(link).toHaveAttribute('href', '/en');
	});
});
