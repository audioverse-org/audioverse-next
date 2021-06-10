import { buildRenderer, loadAuthGuardData } from '@lib/test/helpers';
import Login from '@pages/[language]/account/login.ts';
import { waitFor } from '@testing-library/react';

const renderPage = buildRenderer(Login);

describe('login page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('renders login form', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('password')).toBeInTheDocument();
	});

	it('redirects when user authenticated', async () => {
		loadAuthGuardData();

		const push = jest.fn();

		await renderPage({ router: { push } });

		await waitFor(() => {
			expect(push).toBeCalledWith('/en/discover');
		});
	});
});

// TODO:
// displays login page
// redirects on successful login
