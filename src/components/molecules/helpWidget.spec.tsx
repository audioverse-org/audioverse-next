import { screen } from '@testing-library/react';

import HelpWidget from '@components/molecules/helpWidget';
import { buildRenderer } from '@lib/test/helpers';

const renderComponent = buildRenderer(HelpWidget);
const mockBeacon = jest.fn();

describe('help widget', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		window.Beacon = mockBeacon;
	});

	it('renders button', async () => {
		await renderComponent();

		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('opens widget on click', async () => {
		await renderComponent();

		const button = screen.getByRole('button');
		button.click();

		expect(mockBeacon).toBeCalledWith('open');
	});

	it('closes widget on second click', async () => {
		await renderComponent();

		const button = screen.getByRole('button');
		button.click();
		button.click();

		expect(mockBeacon).toBeCalledWith('close');
	});

	// it('catches widget close event', async () => {
	// 	await renderComponent();
	//
	// 	const button = screen.getByRole('button');
	// 	button.click();
	// 	window.Beacon.mock.calls[0][1]();
	//
	// 	expect(mockBeacon).toBeCalledWith('close');
	// });
});
