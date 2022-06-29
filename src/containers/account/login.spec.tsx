import { screen, waitFor } from '@testing-library/react';
import { __mockedRouter } from 'next/router';

import { buildRenderer } from '@lib/test/buildRenderer';
import { loadAuthGuardData } from '@lib/test/loadAuthGuardData';
import Login from '@pages/[language]/account/login';

const renderPage = buildRenderer(Login);

describe('login page', () => {
	it('renders login form', async () => {
		await renderPage();

		expect(screen.getByPlaceholderText('jane@example.com')).toBeInTheDocument();
	});

	it('redirects when user authenticated', async () => {
		loadAuthGuardData();

		await renderPage();

		await waitFor(() => {
			expect(__mockedRouter.push).toBeCalledWith('/en/discover');
		});
	});
});
