import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '~components/molecules/button';
import Modal from '~components/organisms/modal';
import root, { isRedirectRouteAllowed } from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import styles from './buttonGuest.module.scss';

export default function ButtonGuest({
	className,
}: {
	className?: string;
}): JSX.Element {
	const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
	const [isGuestModal2Open, setIsGuestModal2Open] = useState(false);
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
				<button
					className={styles.link}
					data-testid="guest-info-button2"
					onClick={(e) => {
						e.preventDefault();
						setIsGuestModalOpen(true);
					}}
				>
					<FormattedMessage
						id="molecule-buttonGuest__label"
						defaultMessage="Why Sign Up?"
					/>
				</button>
			</div>

			{/* first modal ############################################################################# */}
			<Modal
				open={isGuestModalOpen}
				//onClose={() => setIsGuestModalOpen(false)}
				title={
					<FormattedMessage
						id="molecule-buttonGuest__modalTitle"
						defaultMessage="Why Sign Up?"
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
							className={styles.centerText}
							type="primary"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelCreateAccount"
									defaultMessage="Sign Up"
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
							className={styles.centerText}
							type="secondary"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelLogIn"
									defaultMessage="Log in"
								/>
							}
						/>
						<Button
							onClick={() => {
								setIsGuestModalOpen(false);
								setIsGuestModal2Open(true);
							}}
							className={styles.link}
							type="none"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelSkip"
									defaultMessage="Skip"
								/>
							}
						/>
					</>
				}
			>
				<p className={styles.intro}>
					<FormattedMessage
						id="molecule-buttonGuest__modalParagraph"
						defaultMessage="Free user accounts help us provide you with a personal, customized experience, giving you access to mobile downloads, saving, and more. In addition, accounts help us know how users use the app, which helps us know how to improve the app."
					/>
				</p>
				<p className={styles.intro}>
					<FormattedMessage
						id="molecule-buttonGuest__modalParagraph1-2"
						defaultMessage="Please consider signing up or logging in to help our mission of sharing sound doctrine."
					/>
				</p>
			</Modal>

			{/* last modal ##################################################################################*/}
			<Modal
				open={isGuestModal2Open}
				//onClose={() => setIsGuestModal2Open(false)}
				title={
					<FormattedMessage
						id="molecule-buttonGuest__modalTitle2"
						defaultMessage="Are you sure?"
					/>
				}
				actions={
					<>
						<Button
							onClick={() => setIsGuestModal2Open(false)}
							href={root.lang(language).account.register.get({
								params: {
									back: redirectRoute,
								},
							})}
							className={styles.centerText}
							type="primary"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelCreateAccount"
									defaultMessage="Sign Up"
								/>
							}
						/>
						<Button
							onClick={() => setIsGuestModal2Open(false)}
							href={root.lang(language).account.login.get({
								params: {
									back: redirectRoute,
								},
							})}
							className={styles.centerText}
							type="secondary"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelLogIn"
									defaultMessage="Log in"
								/>
							}
						/>
						<Button
							onClick={() => setIsGuestModal2Open(false)}
							href="/"
							className={styles.link}
							type="none"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelGuestSkip2"
									defaultMessage="Skip"
								/>
							}
						/>
					</>
				}
			>
				<p className={styles.intro}>
					<FormattedMessage
						id="molecule-buttonGuest__modalParagraph2"
						defaultMessage="With a free account,you can"
					/>
				</p>
				<ol className={styles.featuresList}>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__Download"
							defaultMessage="Download content for offline access"
						/>
					</li>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__save"
							defaultMessage="Save your content to listen later"
						/>
					</li>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__sync"
							defaultMessage="Pick up where you left off across devices"
						/>
					</li>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__requests"
							defaultMessage="Avoid annoying login requests"
						/>
					</li>
				</ol>
			</Modal>
		</>
	);
}
