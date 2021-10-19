import { useLogout } from '@lib/api';
import { buildRenderer } from '@lib/test/helpers';
import Logout from '@pages/[language]/account/logout';

jest.mock('@lib/api/useLogout');

const renderPage = buildRenderer(Logout);

describe('logout route', () => {
	it('logs out', async () => {
		await renderPage();

		expect(useLogout).toBeCalled();
	});
});

// TODO: redirect after logout
