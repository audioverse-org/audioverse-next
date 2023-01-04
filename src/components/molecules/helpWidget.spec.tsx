import { act, screen, waitFor } from '@testing-library/react';
import { __loadRouter, __mockedRouter } from 'next/router';
import Script from 'next/script';

import HelpWidget from '@components/molecules/helpWidget';
import { GetHelpWidgetDataDocument } from '@lib/generated/graphql';
import { buildRenderer } from '@lib/test/buildRenderer';
import filterByExpectation from '@lib/test/getMatchingCall';
import { buildLoader } from '@lib/test/buildLoader';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';

vi.mock('next/script');

const mockBeacon = vi.fn();

const renderComponent = buildRenderer(HelpWidget);

const runOnLoad = () => {
	const props = (Script as Mock).mock.calls[0][0];
	act(() => {
		props.onLoad();
	});
};

const awaitReady = async () => {
	runOnLoad();

	await waitFor(() => {
		expect(__mockedRouter.events.on).toBeCalled();
	});
};

const getRouteListener = async () => {
	const matches = filterByExpectation(
		(__mockedRouter.events.on as Mock).mock.calls,
		expect.arrayContaining(['routeChangeComplete', expect.any(Function)])
	);

	return matches[matches.length - 1][1];
};

const runRouteListener = async (route = 'the_url') => {
	const listener = await getRouteListener();
	listener(route);
};

const loadData = buildLoader(GetHelpWidgetDataDocument, {
	me: {
		user: {
			name: 'the_name',
			email: 'the_email',
			image: {
				url: 'the_image_url',
			},

			address1: 'the_address1',
			address2: 'the_address2',
			autoplay: true,
			city: 'the_city',
			country: 'the_country',
			createdAt: new Date(),
			id: 'the_id',
			isSuperuser: true,
			language: 'the_language',
			lastActivity: new Date(),
			postalCode: 'the_postalCode',
			province: 'the_province',
			timezone: 'the_timezone',
		},
	},
});

describe('help widget', () => {
	beforeEach(() => {
		__loadRouter();
		window.Beacon = mockBeacon;
	});

	it('opens widget on click', async () => {
		await renderComponent();

		await awaitReady();

		const button = await screen.findByRole('button');

		userEvent.click(button);

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('open');
		});
	});

	it('closes widget on second click', async () => {
		await renderComponent();

		await awaitReady();

		const button = screen.getByRole('button');

		userEvent.click(button);

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('open');
		});

		userEvent.click(button);

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('close');
		});
	});

	it('catches widget close event', async () => {
		await renderComponent();

		await awaitReady();

		const button = screen.getByRole('button');

		userEvent.click(button);

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

		userEvent.click(button);

		expect(mockBeacon).not.toBeCalledWith('close');
	});

	it('initializes beacon', async () => {
		await renderComponent();

		await awaitReady();

		expect(mockBeacon).toBeCalledWith('init', expect.any(String));
	});

	it('unsubscribes using specific callback', async () => {
		const { unmount } = await renderComponent();

		await awaitReady();

		unmount();

		expect(mockBeacon).toBeCalledWith('off', 'close', expect.any(Function));
	});

	it('identifies user', async () => {
		loadData();

		await renderComponent();

		await awaitReady();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith('identify', {
				name: 'the_name',
				email: 'the_email',
			});
		});
	});

	it('registers page views with beacon', async () => {
		await renderComponent();

		await awaitReady();

		window.document.title = 'the_title';

		await runRouteListener();

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

		await awaitReady();

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

	it('provides account info', async () => {
		loadData();

		await renderComponent();

		await awaitReady();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith(
				'session-data',
				expect.objectContaining({
					name: 'the_name',
					email: 'the_email',
					address1: 'the_address1',
					address2: 'the_address2',
					autoplay: 'true',
					city: 'the_city',
					country: 'the_country',
					createdAt: expect.any(String),
					id: 'the_id',
					isSuperuser: 'true',
					language: 'the_language',
					lastActivity: expect.any(String),
					postalCode: 'the_postalCode',
					province: 'the_province',
					timezone: 'the_timezone',
				})
			);
		});
	});

	it('does not identify user if using private email', async () => {
		loadData({
			me: {
				user: {
					email: '123@privaterelay.appleid.com',
				},
			},
		});

		await renderComponent();

		await awaitReady();

		expect(mockBeacon).not.toBeCalledWith('identify', expect.any(Object));
	});

	it('prefills name when email is private', async () => {
		loadData({
			me: {
				user: {
					email: '123@privaterelay.appleid.com',
				},
			},
		});

		await renderComponent();

		await awaitReady();

		await waitFor(() => {
			expect(mockBeacon).toBeCalledWith(
				'prefill',
				expect.objectContaining({
					name: 'the_name',
				})
			);
		});
	});

	it('triggers suggest on page-viewed', async () => {
		await renderComponent();

		await awaitReady();

		await runRouteListener();

		expect(mockBeacon).toBeCalledWith('suggest');
	});
});
