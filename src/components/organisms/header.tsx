import React from 'react';

import LoadingIndicator from '@components/molecules/loadingIndicator';

import styles from './header.module.scss';
import useLanguageRoute from '@lib/useLanguageRoute';
import { FormattedMessage } from 'react-intl';

const Header = (): JSX.Element => {
	const languageRoute = useLanguageRoute();

	return (
		<header className={styles.header}>
			<h1>
				<FormattedMessage
					id="header__siteName"
					defaultMessage="AudioVerse"
					description="Header site name"
				/>
			</h1>
			<input placeholder={'Search'} />
			<a href={`/${languageRoute}/give`}>
				<FormattedMessage
					id="header__donateButton"
					defaultMessage="Donate Now"
					description="Header donate button"
				/>
			</a>
			<LoadingIndicator />
		</header>
	);
};

export default Header;
