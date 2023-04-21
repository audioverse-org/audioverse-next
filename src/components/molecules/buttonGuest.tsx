import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '~components/molecules/button';
import Modal from '~components/organisms/modal';
import root, { isRedirectRouteAllowed } from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import Icon from '../../../public/img/icons/icon-info.svg';
import styles from './buttonGuest.module.scss';

export default function ButtonGuest({
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

	return (
		<>
			<div className={clsx(styles.wrapper, className)}>
				<Link href={redirectRoute} legacyBehavior>
					<a className="decorated">
						<FormattedMessage
							id="molecule-buttonGuest__label"
							defaultMessage="Continue as guest"
						/>
					</a>
				</Link>
				<button
					className={styles.link}
					data-testid="guest-info-button"
					onClick={(e) => {
						e.preventDefault();
						setIsGuestModalOpen(true);
					}}
				>
					<Icon />
				</button>
			</div>
			<Modal
				open={isGuestModalOpen}
				onClose={() => setIsGuestModalOpen(false)}
				title={
					<FormattedMessage
						id="molecule-buttonGuest__modalTitle"
						defaultMessage="Continue as guest?"
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
						<Link href={redirectRoute} legacyBehavior>
							<a className="decorated">
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelGuest"
									defaultMessage="Continue as guest"
								/>
							</a>
						</Link>
					</>
				}
			>
				<p className={styles.intro}>
					<FormattedMessage
						id="molecule-buttonGuest__modalParagraph"
						defaultMessage="You'll be missing out on some key features without an account, like:"
					/>
				</p>
				<ul className={styles.featuresList}>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__saving"
							defaultMessage="Saving to your library"
						/>
					</li>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__syncing"
							defaultMessage="Syncing across your devices"
						/>
					</li>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__downloadQuality"
							defaultMessage="Adjusting download quality"
						/>
					</li>
				</ul>
			</Modal>
		</>
	);
}
