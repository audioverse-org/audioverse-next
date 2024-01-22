import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~components/molecules/button';
import Modal from '~components/organisms/modal';
import root, { isRedirectRouteAllowed } from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import IconDownload from '~public/img/icons/icon-download.svg';

import styles from './buttonGuest.module.scss';

export default function ButtonDownloadBlank({
	className,
}: {
	className?: string;
}): JSX.Element {
	const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
	const language = useLanguageRoute();
	const router = useRouter();
	const backRoute = router.query.back as string;
	const redirectRoute =
		backRoute && isRedirectRouteAllowed(backRoute)
			? backRoute
			: root.lang(language).discover.get();

	const intl = useIntl();

	return (
		<>
			<div className={clsx(styles.wrapper, className)}>
				<button
					className={styles.link}
					data-testid="guest-download-button"
					onClick={(e) => {
						e.preventDefault();
						setIsGuestModalOpen(true);
					}}
					aria-label={intl.formatMessage({
						id: 'molecule-buttonDownload__buttonLabel',
						defaultMessage: 'downloads',
						description: 'download button label',
					})}
				>
					<IconDownload />
				</button>
			</div>
			<Modal
				open={isGuestModalOpen}
				onClose={() => setIsGuestModalOpen(false)}
				title={
					<FormattedMessage
						id="molecule-buttonGuestDownload__modalTitle"
						defaultMessage="Create a Free Account"
					/>
				}
				actions={
					<>
						<Button
							onClick={() => setIsGuestModalOpen(false)}
							href={root.lang(language).account.register.get({
								params: {
									back: redirectRoute,
								},
							})}
							type="super"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelCreateAccount"
									defaultMessage="Create account"
								/>
							}
						/>
						<Button
							onClick={() => setIsGuestModalOpen(false)}
							href={root.lang(language).account.login.get({
								params: {
									back: redirectRoute,
								},
							})}
							type="primary"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelLogIn"
									defaultMessage="Log in"
								/>
							}
						/>
					</>
				}
			>
				<p className={styles.intro}>
					<FormattedMessage
						id="molecule-buttonGuestDownload__modalParagraph"
						defaultMessage="Create a free account or login to access the Library features, like saving, viewing your downloads & history, and syncing across devices."
					/>
				</p>
			</Modal>
		</>
	);
}
