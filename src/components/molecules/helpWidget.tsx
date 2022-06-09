import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@components/molecules/button';
import { useGetHelpWidgetDataQuery } from '@components/molecules/helpWidget.gql';
import useHelpScoutLabels from '@lib/useHelpScoutLabels';
import IconQuestionCircle from '@public/img/icons/icon-question-circle.svg';

import { Beacon } from '../../types/window';

const BEACON_ID = 'e73e9329-30be-4766-99bb-6bfdd739e316';

export default function HelpWidget(): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { data } = useGetHelpWidgetDataQuery();
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
		[didLoad]
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
		if (!d) {
			return;
		}

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
