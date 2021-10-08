import clsx from 'clsx';
import { Router, useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import InfoBox from '@components/atoms/infoBox';
import { LANGUAGES } from '@lib/constants';
import { getLanguageId, setLanguageId } from '@lib/cookies';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import getLanguageIds from '@lib/getLanguageIds';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconDisclosure from '../../../public/img/icon-disclosure-light-small.svg';
import IconLanguage from '../../../public/img/icon-language-light.svg';

import Button from './button';
import Dropdown from './dropdown';
import styles from './languageAlternativesAlert.module.scss';

const SUPPORTED_ROUTES = [
	'/[language]/blog',
	'/[language]/discover',
	'/[language]/discover/collections',
];

export default function LanguageAlternativesAlert(): JSX.Element | null {
	const [showingAlert, setShowingAlert] = React.useState(false);
	const languageRoute = useLanguageRoute();
	const languageId = getLanguageIdByRoute(languageRoute);

	const router = useRouter();

	const setCurrentRouteToCookie = () => {
		setLanguageId(languageRoute);
		setShowingAlert(false);
	};

	useEffect(() => {
		Router.events.on('routeChangeStart', setCurrentRouteToCookie);
		setShowingAlert(true);
		return () => {
			Router.events.off('routeChangeStart', setCurrentRouteToCookie);
		};
	}, []);

	const isServerSide = typeof window === 'undefined';
	const referrer = isServerSide ? null : document.referrer;
	const cookieLanguageId = getLanguageId();

	const languageIds = getLanguageIds();

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
			<Dropdown
				id="languagesMenu"
				trigger={({ isOpen, ...props }) => (
					<Button
						type="primaryInverse"
						text={LANGUAGES[languageId].display_name}
						IconLeft={IconLanguage}
						IconRight={IconDisclosure}
						className={clsx(styles.button, isOpen && styles.buttonOpen)}
						{...props}
					/>
				)}
				alignment="left"
			>
				<div className={styles.dropdownContainer}>
					{languageIds.map((id) => (
						<p className={styles.languageAlternative} key={id}>
							<a
								onClick={(e) => {
									e.preventDefault();
									Router.events.off(
										'routeChangeStart',
										setCurrentRouteToCookie
									);
									setLanguageId(LANGUAGES[id].base_url);
									router.push(
										router.pathname.replace(
											'[language]',
											LANGUAGES[id].base_url
										)
									);
								}}
							>
								{LANGUAGES[id].display_name}
							</a>
						</p>
					))}
				</div>
			</Dropdown>

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
