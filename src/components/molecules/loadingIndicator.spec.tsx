import { screen } from '@testing-library/react';
import React from 'react';

import LoadingIndicator from '@/components/molecules/loadingIndicator';
import renderWithProviders from '@/lib/test/renderWithProviders';
import useRouterLoading from '@/lib/useRouterLoading';
import { describe, expect, it, Mock, vi } from 'vitest';

vi.mock('@/lib/useRouterLoading');

const mockUseRouterLoading = useRouterLoading as Mock;

describe('loading indicator', () => {
	it('shows indicator when router loading', async () => {
		mockUseRouterLoading.mockReturnValue(true);

		await renderWithProviders(<LoadingIndicator />);

		expect(await screen.findByRole('progressbar')).toBeVisible();
	});
});
