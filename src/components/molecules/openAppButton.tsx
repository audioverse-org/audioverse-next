import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from './button';
import styles from './openAppButton.module.scss';

const OpenAppButton: React.FC = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [os, setOs] = useState<string | null>(null);

	useEffect(() => {
		const userAgent = navigator.userAgent || navigator.vendor;
		const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);
		const isAndroid = /android/i.test(userAgent);

		if (isIOS) {
			setOs('iOS');
		} else if (isAndroid) {
			setOs('Android');
		} else {
			setOs(null);
		}

		setIsMobile(isIOS || isAndroid);
	}, []);

	const handleButtonClick = () => {
		if (os === 'iOS') {
			window.location.href = 'fb2085245451868293://';
			setTimeout(() => {
				window.location.href =
					'https://apps.apple.com/us/app/audioverse/id726998810';
			}, 25);
		} else if (os === 'Android') {
			window.location.href =
				'intent://org.audioverse.exodus/#Intent;scheme=fb2085245451868293;package=org.audioverse.exodus;end';
			setTimeout(() => {
				window.location.href =
					'https://play.google.com/store/apps/details?id=org.audioverse.exodus';
			}, 25);
		}
	};

	if (!isMobile) return null;

	return (
		<Button
			key="openAppButton"
			type="primary"
			onClick={handleButtonClick}
			className={styles.open_app}
			text={<FormattedMessage id="open_app" defaultMessage="Open App" />}
		/>
	);
};

export default OpenAppButton;
