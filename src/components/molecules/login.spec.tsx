import Login from '@components/molecules/login';
import { renderWithIntl } from '@lib/test/helpers';

describe('login form', () => {
	it('renders forgot password link', async () => {
		const { getByText } = await renderWithIntl(Login, {});

		expect(getByText('forgot password'));
	});
});

// wire up forgot password button
