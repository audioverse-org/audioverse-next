import { waitFor } from '@testing-library/react';

import {
	buildRenderer,
	loadAuthGuardData,
	mockedRouter,
} from '@lib/test/helpers';
import Login from '@pages/[language]/account/login';

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
			expect(mockedRouter.push).toBeCalledWith('/en/discover');
		});
	});
});
