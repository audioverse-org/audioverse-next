import clsx from 'clsx';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import InfoBox from '~components/atoms/infoBox';
import { getLanguageId, setLanguageId } from '~lib/cookies';
import isServerSide from '~lib/isServerSide';
import useLanguageRoute from '~lib/useLanguageRoute';

import styles from './languageAlternativesAlert.module.scss';
import LanguageButton from './languageButton';

const SUPPORTED_ROUTES = [
	'/[language]',
	'/[language]/blog',
	'/[language]/discover',
	'/[language]/discover/collections',
];

export default function LanguageAlternativesAlert(): JSX.Element | null {
	const [showingAlert, setShowingAlert] = React.useState(false);
	const languageRoute = useLanguageRoute();

	const router = useRouter();

	const setCurrentRouteToCookie = useMemo(
		() => () => {
			setLanguageId(languageRoute);
			setShowingAlert(false);
		},
		[languageRoute],
	);

	useEffect(() => {
		Router.events.on('routeChangeStart', setCurrentRouteToCookie);
		setShowingAlert(true);
		return () => {
			Router.events.off('routeChangeStart', setCurrentRouteToCookie);
		};
	}, [setCurrentRouteToCookie]);

	const referrer = isServerSide() ? null : document.referrer;
	const cookieLanguageId = getLanguageId();

	if (
		referrer ||
		cookieLanguageId ||
		!showingAlert ||
		!SUPPORTED_ROUTES.includes(router.pathname)
	) {
		return null;
	}

	return (
		<InfoBox className={styles.box}>
			<div>
				<FormattedMessage
					id="languageAlternativesAlert__message"
					defaultMessage="Thanks to our supporters and international partners, AudioVerse exists in many language sites available. Change your language here or in the menu."
				/>
			</div>
			<LanguageButton
				buttonType="primaryInverse"
				onClick={(baseUrl) => {
					Router.events.off('routeChangeStart', setCurrentRouteToCookie);
					setLanguageId(baseUrl);
					router.push(router.pathname.replace('[language]', baseUrl));
				}}
				className={styles.button}
			/>

			<a
				onClick={(e) => {
					e.preventDefault();
					setCurrentRouteToCookie();
				}}
				className={clsx(styles.dismiss, 'decorated hover--salmon')}
			>
				<FormattedMessage
					id="languageAlternativesAlert__dismiss"
					defaultMessage="Dismiss"
				/>
			</a>
		</InfoBox>
	);
}
