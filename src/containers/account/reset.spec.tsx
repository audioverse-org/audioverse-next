import { buildRenderer } from '@lib/test/helpers';
import Reset from '@pages/[language]/account/reset';

const renderPage = buildRenderer(Reset);

describe('password reset page', () => {
	it('renders', async () => {
		await renderPage();
	});

	it('renders password field', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('password')).toBeInTheDocument();
	});

	it('renders password confirm field', async () => {
		const { getByPlaceholderText } = await renderPage();

		expect(getByPlaceholderText('confirm password')).toBeInTheDocument();
	});

	it('renders submit button', async () => {
		const { getByText } = await renderPage();

		expect(getByText('submit'));
	});
});

// submit button
// input in both fields required
// both fields must match
// API errors displayed
// generic error displayed on http failure
// localization
