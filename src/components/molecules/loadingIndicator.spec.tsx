import React from 'react';

import LoadingIndicator from '@components/molecules/loadingIndicator';
import { renderWithQueryProvider } from '@lib/test/helpers';
import useRouterLoading from '@lib/useRouterLoading';

jest.mock('@lib/useRouterLoading');

const mockUseRouterLoading = useRouterLoading as jest.Mock;

describe('loading indicator', () => {
	it('shows indicator when router loading', async () => {
		mockUseRouterLoading.mockReturnValue(true);

		const { getByTestId } = await renderWithQueryProvider(<LoadingIndicator />);

		expect(getByTestId('loading-indicator')).toHaveClass('visible', 'loading');
	});
});
