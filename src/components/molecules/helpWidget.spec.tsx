import { act, screen, waitFor } from '@testing-library/react';
import { when } from 'jest-when';
import { __loadRouter } from 'next/router';
import Script from 'next/script';

import HelpWidget from '@components/molecules/helpWidget';
import { fetchApi } from '@lib/api/fetchApi';
import { GetHelpWidgetDataDocument } from '@lib/generated/graphql';
import { buildRenderer } from '@lib/test/buildRenderer';
import filterByExpectation from '@lib/test/getMatchingCall';

jest.mock('next/script');

const mockBeacon = jest.fn() as jest.Mock;

const renderComponent = buildRenderer(HelpWidget);
const runOnLoad = () => {
	const props = (Script as jest.Mock).mock.calls[0][0];
	act(() => {
		props.onLoad();
	});
};

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
	beforeEach(() => {
		window.Beacon = mockBeacon;
	});

	it('opens widget on click', async () => {
		await renderComponent();

		runOnLoad();

		const button = await screen.findByRole('button');

		button.click();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('open');
		});
	});

	it('closes widget on second click', async () => {
		await renderComponent();

		runOnLoad();

		const button = screen.getByRole('button');
		button.click();
		button.click();

		expect(mockBeacon).toBeCalledWith('close');
	});

	it('catches widget close event', async () => {
		await renderComponent();

		runOnLoad();

		const button = screen.getByRole('button');
		button.click();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('on', 'close', expect.any(Function));
		});

		const matches = filterByExpectation(
			mockBeacon.mock.calls,
			expect.arrayContaining(['on', 'close', expect.any(Function)])
		);

		await act(async () => {
			matches[matches.length - 1][2]();
		});

		button.click();

		expect(mockBeacon).not.toBeCalledWith('close');
	});

	it('initializes beacon', async () => {
		await renderComponent();

		runOnLoad();

		expect(mockBeacon).toBeCalledWith('init', expect.any(String));
	});

	it('unsubscribes using specific callback', async () => {
		const { unmount } = await renderComponent();

		runOnLoad();

		unmount();

		expect(mockBeacon).toBeCalledWith('off', 'close', expect.any(Function));
	});

	it('identifies user', async () => {
		loadData();

		await renderComponent();

		runOnLoad();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('identify', {
				name: 'the_name',
				email: 'the_email',
			});
		});
	});

	it('registers page views with beacon', async () => {
		const router = __loadRouter();

		await renderComponent();

		runOnLoad();

		await screen.findByRole('button');

		const calls = (router.events.on as jest.Mock).mock.calls;

		await waitFor(() => {
			expect(router.events.on).toBeCalled();
		});

		const matches = filterByExpectation(
			calls,
			expect.arrayContaining(['routeChangeComplete', expect.any(Function)])
		);

		const callback = matches[matches.length - 1][1];

		window.document.title = 'the_title';

		callback('the_url');

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('event', {
				type: 'page-viewed',
				url: 'the_url',
				title: 'the_title',
			});
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

	it('translates strings', async () => {
		await renderComponent();

		runOnLoad();

		expect(mockBeacon).toBeCalledWith(
			'config',
			expect.objectContaining({
				labels: expect.objectContaining({
					suggestedForYou: expect.any(String),
				}),
			})
		);
	});

	it('handles unset beacon', async () => {
		window.Beacon = undefined;

		await expect(renderComponent()).resolves.not.toThrow();
	});

	it('renders script to load beacon', async () => {
		window.Beacon = undefined;

		await renderComponent();

		expect(Script).toBeCalledWith(
			expect.objectContaining({
				id: 'beaconOnLoad',
			}),
			expect.anything()
		);
	});
});
