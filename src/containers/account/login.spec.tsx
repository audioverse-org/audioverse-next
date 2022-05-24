import { waitFor } from '@testing-library/react';

import { buildRenderer } from '@lib/test/buildRenderer';
import { loadAuthGuardData } from '@lib/test/loadAuthGuardData';
import Login from '@pages/[language]/account/login';

import { _mockedRouter } from '../../__mocks__/next/router';

const renderPage = buildRenderer(Login);

describe('login page', () => {
	it('renders login form', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('jane@example.com')).toBeInTheDocument();
	});

	it('redirects when user authenticated', async () => {
		loadAuthGuardData();

		await renderPage();

		await waitFor(() => {
			expect(_mockedRouter.push).toBeCalledWith('/en/discover');
		});
	});
});
