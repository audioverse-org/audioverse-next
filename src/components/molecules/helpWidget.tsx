import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@components/molecules/button';
import { useGetHelpWidgetDataQuery } from '@lib/generated/graphql';
import useHelpScoutLabels from '@lib/useHelpScoutLabels';
import IconQuestionCircle from '@public/img/icon-question-circle.svg';

function Inner(): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { data } = useGetHelpWidgetDataQuery();
	const router = useRouter();
	const labels = useHelpScoutLabels();

	useEffect(() => {
		window.Beacon('init', 'e73e9329-30be-4766-99bb-6bfdd739e316');

		const handleClose = (): void => {
			setIsOpen(false);
		};

		window.Beacon('on', 'close', handleClose);

		return () => {
			window.Beacon('off', 'close', handleClose);
		};
	}, []);

	useEffect(() => {
		window.Beacon('config', { labels });
	}, [labels]);

	useEffect(() => {
		const d = data?.me?.user;
		if (!d) {
			return;
		}

		window.Beacon('identify', {
			email: d.email,
			name: d.name,
			avatar: d.image?.url || '',
		});
	}, [data]);

	useEffect(() => {
		const listener = (url: string) => {
			window.Beacon('event', {
				type: 'page-viewed',
				url,
				title: document.title,
			});
		};
		router.events.on('routeChangeComplete', listener);
		return () => {
			router.events.off('routeChangeComplete', listener);
		};
	}, [router]);

	return (
		<>
			<Script
				id="beaconOnLoad"
				dangerouslySetInnerHTML={{
					__html: `!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});`,
				}}
			/>
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
					window.Beacon(isOpen ? 'close' : 'open');
					setIsOpen(!isOpen);
				}}
			/>
		</>
	);
}

export default function HelpWidget() {
	if (!window.Beacon) {
		return null;
	}

	return <Inner />;
}
