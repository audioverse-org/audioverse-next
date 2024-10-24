import { screen } from '@testing-library/react';
import React from 'react';

import LoadingIndicator from '~components/molecules/loadingIndicator';
import renderWithProviders from '~lib/test/renderWithProviders';
import useRouterLoading from '~lib/useRouterLoading';

jest.mock('~lib/useRouterLoading');

const mockUseRouterLoading = useRouterLoading as jest.Mock;

describe('loading indicator', () => {
	it('shows indicator when router loading', async () => {
		mockUseRouterLoading.mockReturnValue(true);

		await renderWithProviders(<LoadingIndicator />);

		expect(screen.getByTestId('loading-indicator')).toHaveClass(
			'visible',
			'loading',
		);
	});
});
