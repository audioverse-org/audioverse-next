import React from 'react';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from '@components/molecules/loadingIndicator';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './header.module.scss';

const Header = (): JSX.Element => {
	const languageRoute = useLanguageRoute();

	return (
		<header className={styles.header}>
			<h1>
				<img src="/img/av-logo.png" alt="AudioVerse" width={300} />
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
