import React from 'react';
import { FormattedMessage } from 'react-intl';

import Alert from '~components/atoms/alert';
import Heading2 from '~components/atoms/heading2';
import Button from '~components/molecules/button';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import styles from './emptyState.module.scss';

type Props = {
	title: JSX.Element | string;
	message: JSX.Element | string;
};

export default function EmptyState({ title, message }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<Alert className={styles.alert}>
			<Heading2 className={styles.heading}>{title}</Heading2>
			<p className={styles.copy}>{message}</p>
			<Button
				type="super"
				text={
					<FormattedMessage
						// TODO: Rename message ID to match component name, ensuring translations are not lost
						id="libraryError__cta"
						defaultMessage="Go to Discover"
					/>
				}
				href={root.lang(languageRoute).discover.get()}
			/>
		</Alert>
	);
}
