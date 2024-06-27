import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from './button';
import styles from './openAppButton.module.scss';

type Props = {
	isSide?: boolean;
};

const OpenAppButton: React.FC<Props> = ({ isSide }) => {
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isIOS, setIsIOS] = useState<boolean>(false);
	const [isAndroid, setIsAndroid] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userAgent = navigator.userAgent || navigator.vendor;
			const isIOS =
				/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);
			const isAndroid = /android/i.test(userAgent);

			setIsMobile(isIOS || isAndroid);
			setIsIOS(isIOS);
			setIsAndroid(isAndroid);
		}
	}, []);

	const handleButtonClick = () => {
		if (isIOS) {
			window.location.href = 'fb2085245451868293://';
			setTimeout(() => {
				window.location.href =
					'https://apps.apple.com/us/app/audioverse/id726998810';
			}, 25);
		} else if (isAndroid) {
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
			className={isSide ? styles.side : styles.open_app}
			text={<FormattedMessage id="open_app" defaultMessage="Open App" />}
		/>
	);
};

export default OpenAppButton;
