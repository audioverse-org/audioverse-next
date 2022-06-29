import { useLogout } from '@lib/api/useLogout';
import { buildRenderer } from '@lib/test/buildRenderer';
import Logout from '@pages/[language]/account/logout';
import { __loadRouter } from 'next/router';

jest.mock('@lib/api/useLogout');

const renderPage = buildRenderer(Logout);
const mockUseLogout = useLogout as jest.Mock;

describe('logout route', () => {
	it('logs out', async () => {
		mockUseLogout.mockResolvedValue(undefined);
		__loadRouter({ push: () => Promise.resolve(true) });

		await renderPage();

		expect(useLogout).toBeCalled();
	});
});

// TODO: redirect after logout
