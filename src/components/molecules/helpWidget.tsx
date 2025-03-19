import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '~components/molecules/button';
import IconQuestionCircle from '~public/img/icons/icon-question-circle.svg';
import useHelpScoutLabels from '~src/lib/hooks/useHelpScoutLabels';
import useIsAuthenticated from '~src/lib/hooks/useIsAuthenticated';

import { Beacon } from '../../types/window';
import { useGetHelpWidgetDataQuery } from './__generated__/helpWidget';

const BEACON_ID = 'e73e9329-30be-4766-99bb-6bfdd739e316';

export default function HelpWidget(): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { isUserLoggedIn } = useIsAuthenticated();
	const { data } = useGetHelpWidgetDataQuery({}, { enabled: isUserLoggedIn });
	const router = useRouter();
	const labels = useHelpScoutLabels();
	const [didLoad, setDidLoad] = useState<boolean>(false);

	// WORKAROUND: https://github.com/microsoft/TypeScript/issues/14107
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const doBeacon: Beacon = useCallback(
		(...p: any) => {
			if (!didLoad || !window.Beacon) {
				return;
			}
			return (window.Beacon as any)(...p);
		},
		[didLoad],
	);
	/* eslint-enable @typescript-eslint/no-explicit-any */

	const handleClose = useCallback((): void => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		doBeacon('on', 'close', handleClose);
		return () => {
			doBeacon('off', 'close', handleClose);
		};
	}, [doBeacon, handleClose]);

	useEffect(() => {
		const d = data?.me?.user;

		if (!d) return;

		const sessionData = Object.entries(d).reduce(
			(acc, [k, v]) => ({
				...acc,
				[k]: v?.toString() || 'undefined',
			}),
			{},
		);

		doBeacon('session-data', sessionData);

		doBeacon('prefill', {
			name: d.name,
		});

		const isEmailPrivate = d.email.includes('@privaterelay.appleid.com');

		if (isEmailPrivate) return;

		doBeacon('identify', {
			email: d.email,
			name: d.name,
		});
	}, [doBeacon, data]);

	useEffect(() => {
		const listener = (url: string) => {
			doBeacon('event', {
				type: 'page-viewed',
				url,
				title: document.title,
			});
			doBeacon('suggest');
		};
		router.events.on('routeChangeComplete', listener);
		return () => {
			router.events.off('routeChangeComplete', listener);
		};
	}, [doBeacon, router]);

	return (
		<>
			<Script
				id="beaconOnLoad"
				src="/helpscout.js"
				strategy="afterInteractive"
				onLoad={() => {
					if (!window?.Beacon) return;
					window.Beacon('config', { labels });
					window.Beacon('init', BEACON_ID);
					setDidLoad(true);
				}}
			/>

			{didLoad && (
				<Button
					type="super"
					text={
						<FormattedMessage
							id="helpWidget__buttonLabel"
							defaultMessage="Help"
						/>
					}
					IconLeft={IconQuestionCircle}
					onClick={() => {
						doBeacon(isOpen ? 'close' : 'open');
						setIsOpen(!isOpen);
					}}
				/>
			)}
		</>
	);
}
