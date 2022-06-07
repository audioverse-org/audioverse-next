import React from 'react';

import { useLogout } from '@lib/api/useLogout';
import getBeacon from '@lib/getBeacon';
import renderWithProviders from '@lib/test/renderWithProviders';

const mockBeacon = jest.fn();
const mockGetBeacon = getBeacon as jest.Mock;

mockGetBeacon.mockImplementation(() => mockBeacon);

const Component = () => {
	useLogout();

	return <></>;
};

describe('useLogout', () => {
	it('logs out beacon', async () => {
		await renderWithProviders(<Component />);

		expect(mockBeacon).toBeCalledWith('logout');
	});
});
