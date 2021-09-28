import React from 'react';
import { FormattedMessage } from 'react-intl';

import Alert from '@components/atoms/alert';
import Heading2 from '@components/atoms/heading2';
import Button from '@components/molecules/button';
import { makeDiscoverRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './libraryError.module.scss';

type Props = {
	title: JSX.Element | string;
	message: JSX.Element | string;
};

export default function LibraryError({ title, message }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<Alert className={styles.alert}>
			<Heading2 className={styles.heading}>{title}</Heading2>
			<p className={styles.copy}>{message}</p>
			<Button
				type="super"
				text={
					<FormattedMessage
						id="libraryError__cta"
						defaultMessage="Go to Discover"
					/>
				}
				href={makeDiscoverRoute(languageRoute)}
			/>
		</Alert>
	);
}
