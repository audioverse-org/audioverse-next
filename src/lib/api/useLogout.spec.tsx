import React from 'react';

import { useLogout } from '@lib/api/useLogout';
import renderWithProviders from '@lib/test/renderWithProviders';

const mockBeacon = vi.fn();

window.Beacon = mockBeacon;

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
