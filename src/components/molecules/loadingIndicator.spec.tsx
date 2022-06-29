import { screen } from '@testing-library/react';
import React from 'react';

import LoadingIndicator from '@components/molecules/loadingIndicator';
import renderWithProviders from '@lib/test/renderWithProviders';
import useIsLoading from '@lib/useIsLoading';

jest.mock('@lib/useIsLoading');

const mockUseIsLoading = useIsLoading as jest.Mock;

describe('loading indicator', () => {
	it('shows indicator when router loading', async () => {
		mockUseIsLoading.mockReturnValue(true);

		await renderWithProviders(<LoadingIndicator />);

		expect(screen.getByTestId('loading-indicator')).toHaveClass('loading');
	});
});
