import React from 'react';

import LoadingIndicator from '@components/molecules/loadingIndicator';
import renderWithProviders from '@lib/test/renderWithProviders';
import useRouterLoading from '@lib/useRouterLoading';

jest.mock('@lib/useRouterLoading');

const mockUseRouterLoading = useRouterLoading as jest.Mock;

describe('loading indicator', () => {
	it('shows indicator when router loading', () => {
		mockUseRouterLoading.mockReturnValue(true);

		const { getByTestId } = renderWithProviders(<LoadingIndicator />);

		expect(getByTestId('loading-indicator')).toHaveClass('visible', 'loading');
	});
});
