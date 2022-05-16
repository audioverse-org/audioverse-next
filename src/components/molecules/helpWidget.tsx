import Script from 'next/script';
import { useEffect, useState } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@components/molecules/button';

export default function HelpWidget(): JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		// window.FreshworksWidget('hide', 'launcher');
	});

	return (
		<>
			<Script
				id="beaconOnLoad"
				dangerouslySetInnerHTML={{
					__html: `!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});`,
				}}
			/>
			<Script
				id="beaconInit"
				dangerouslySetInnerHTML={{
					__html: `window.Beacon('init', 'e73e9329-30be-4766-99bb-6bfdd739e316')`,
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
				onClick={() => {
					window.Beacon(isOpen ? 'close' : 'open');
					setIsOpen(!isOpen);
				}}
			/>
		</>
	);
}
