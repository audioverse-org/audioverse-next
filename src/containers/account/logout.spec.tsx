import { act } from '@testing-library/react';

import { useLogout } from '@lib/api/useLogout';
import { buildRenderer } from '@lib/test/buildRenderer';
import Logout from '@pages/[language]/account/logout';

vi.mock('@lib/api/useLogout');

const renderPage = buildRenderer(Logout);
const mockUseLogout = useLogout as vi.Mock;

describe('logout route', () => {
	it('logs out', async () => {
		mockUseLogout.mockResolvedValue(undefined);

		await act(async () => {
			await renderPage({ router: { push: () => Promise.resolve(true) } });
		});

		expect(useLogout).toBeCalled();
	});
});

// TODO: redirect after logout
