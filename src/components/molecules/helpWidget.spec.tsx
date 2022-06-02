import { act, screen, waitFor } from '@testing-library/react';
import { when } from 'jest-when';
import { __loadRouter } from 'next/router';

import HelpWidget from '@components/molecules/helpWidget';
import { fetchApi } from '@lib/api/fetchApi';
import { GetHelpWidgetDataDocument } from '@lib/generated/graphql';
import { buildRenderer } from '@lib/test/buildRenderer';

jest.mock('next/script');

const renderComponent = buildRenderer(HelpWidget);

const mockBeacon = window.Beacon as jest.Mock;

function loadData() {
	when(fetchApi)
		.calledWith(GetHelpWidgetDataDocument, expect.anything())
		.mockResolvedValue({
			me: {
				user: {
					name: 'the_name',
					email: 'the_email',
					image: {
						url: 'the_image_url',
					},
				},
			},
		});
}

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

	it('identifies user', async () => {
		loadData();

		await renderComponent();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('identify', {
				name: 'the_name',
				email: 'the_email',
				avatar: 'the_image_url',
			});
		});
	});

	it('registers page views with beacon', async () => {
		const router = __loadRouter();

		await renderComponent();

		const calls = (router.events.on as jest.Mock).mock.calls;

		await waitFor(() => {
			expect(router.events.on).toBeCalled();
		});

		const callback = calls[0][1];

		window.document.title = 'the_title';

		callback('the_url');

		expect(mockBeacon).toBeCalledWith('event', {
			type: 'page-viewed',
			url: 'the_url',
			title: 'the_title',
		});
	});

	it('unregisters route change listener on unmount', async () => {
		const router = __loadRouter();

		await renderComponent();

		await waitFor(() => {
			expect(router.events.on).toBeCalled();
		});

		const { unmount } = await renderComponent();

		unmount();

		expect(router.events.off).toBeCalledWith(
			'routeChangeComplete',
			expect.any(Function)
		);
	});
});
