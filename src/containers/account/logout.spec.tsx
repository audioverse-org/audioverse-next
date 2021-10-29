import { act } from '@testing-library/react';

import { useLogout } from '@lib/api';
import * as api from '@lib/api';
import { buildRenderer } from '@lib/test/helpers';
import Logout from '@pages/[language]/account/logout';

jest.mock('@lib/api/useLogout');

const renderPage = buildRenderer(Logout);

describe('logout route', () => {
	it('logs out', async () => {
		jest.spyOn(api, 'useLogout').mockResolvedValue(true);

		await act(async () => {
			await renderPage({ router: { push: () => Promise.resolve(true) } });
		});

		expect(useLogout).toBeCalled();
	});
});

// TODO: redirect after logout
