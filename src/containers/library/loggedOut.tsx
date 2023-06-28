import { FormattedMessage } from 'react-intl';

import Alert from '~components/atoms/alert';
import Heading2 from '~components/atoms/heading2';
import Button from '~components/molecules/button';
import LibraryNav from '~components/organisms/libraryNav';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import baseStyles from './base.module.scss';
import styles from './loggedOut.module.scss';

export default function LibraryLoggedOut(): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref={null} disabled />
			<Alert className={styles.membersOnlyAlert}>
				<Heading2 className={styles.membersOnlyHeading}>
					<FormattedMessage
						id="library__createAccountHeading"
						defaultMessage="Create a free account"
					/>
				</Heading2>
				<p className={styles.membersOnlyCopy}>
					<FormattedMessage
						id="library__freeAccountCopy"
						defaultMessage="Create a free account or login to access the Library features, like saving, viewing your history, and syncing across devices."
					/>
				</p>
				<Button
					type="super"
					text={
						<FormattedMessage
							id="library__membersOnlyCta"
							defaultMessage="Create account or Login"
						/>
					}
					href={root.lang(languageRoute).account.register.get({
						params: {
							back: root.lang(languageRoute).library.get(),
						},
					})}
				/>
			</Alert>
		</div>
	);
}
