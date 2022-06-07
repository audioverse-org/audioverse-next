import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@components/molecules/button';
import { useGetHelpWidgetDataQuery } from '@lib/generated/graphql';
import getBeacon from '@lib/getBeacon';
import useHelpScoutLabels from '@lib/useHelpScoutLabels';
import IconQuestionCircle from '@public/img/icons/icon-question-circle.svg';

import { Beacon } from '../../types/window';

const BEACON_ID = 'e73e9329-30be-4766-99bb-6bfdd739e316';

export default function HelpWidget(): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [beacon, setBeacon] = useState<Beacon>(getBeacon);
	const { data } = useGetHelpWidgetDataQuery();
	const router = useRouter();
	const labels = useHelpScoutLabels();

	useEffect(() => {
		if (!beacon) return;

		const handleClose = (): void => {
			setIsOpen(false);
		};

		beacon('on', 'close', handleClose);

		return () => {
			beacon('off', 'close', handleClose);
		};
	}, [beacon]);

	useEffect(() => {
		const d = data?.me?.user;
		if (!d || !beacon) {
			return;
		}

		beacon('identify', {
			email: d.email,
			name: d.name,
		});
	}, [beacon, data]);

	useEffect(() => {
		if (!beacon) return;
		const listener = (url: string) => {
			beacon('event', {
				type: 'page-viewed',
				url,
				title: document.title,
			});
		};
		router.events.on('routeChangeComplete', listener);
		return () => {
			router.events.off('routeChangeComplete', listener);
		};
	}, [beacon, router]);

	return (
		<>
			<Script
				id="beaconOnLoad"
				src="/helpscout.js"
				onLoad={() => {
					const b = getBeacon();
					if (b) {
						b('config', { labels });
						b('init', BEACON_ID);
						setBeacon(() => b);
					}
				}}
			/>
			{beacon && (
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
						beacon(isOpen ? 'close' : 'open');
						setIsOpen(!isOpen);
					}}
				/>
			)}
		</>
	);
}
