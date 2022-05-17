import { act, screen, waitFor } from '@testing-library/react';

import HelpWidget from '@components/molecules/helpWidget';
import { buildRenderer } from '@lib/test/helpers';

jest.mock('next/script');

const renderComponent = buildRenderer(HelpWidget);

const mockBeacon = window.Beacon as jest.Mock;

describe('help widget', () => {
	it('opens widget on click', async () => {
		await renderComponent();

		const button = screen.getByRole('button');
		button.click();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('open');
		});
	});

	it('closes widget on second click', async () => {
		await renderComponent();

		const button = screen.getByRole('button');
		button.click();
		button.click();

		expect(mockBeacon).toBeCalledWith('close');
	});

	it('catches widget close event', async () => {
		await renderComponent();

		const button = screen.getByRole('button');
		button.click();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('on', 'close', expect.any(Function));
		});

		await act(async () => {
			mockBeacon.mock.calls[1][2]();
		});

		button.click();

		expect(mockBeacon).not.toBeCalledWith('close');
	});

	it('initializes beacon', async () => {
		await renderComponent();

		expect(mockBeacon).toBeCalledWith('init', expect.any(String));
	});

	it('unsubscribes using specific callback', async () => {
		const { unmount } = await renderComponent();

		unmount();

		expect(mockBeacon).toBeCalledWith('off', 'close', expect.any(Function));
	});
});
