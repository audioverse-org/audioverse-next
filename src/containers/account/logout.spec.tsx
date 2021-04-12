import { logout } from '@lib/api';
import { buildRenderer } from '@lib/test/helpers';
import Logout from '@pages/[language]/account/logout';

jest.mock('@lib/api/logout');

const renderPage = buildRenderer(Logout);

describe('logout route', () => {
	it('logs out', async () => {
		await renderPage();

		expect(logout).toBeCalled();
	});
});

// TODO: redirect after logout
