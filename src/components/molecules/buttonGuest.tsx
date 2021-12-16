import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@components/molecules/button';
import Modal from '@components/organisms/modal';
import {
	makeDiscoverRoute,
	makeLoginRoute,
	makeRegisterRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import Icon from '../../../public/img/icon-info.svg';

import styles from './buttonGuest.module.scss';

export default function ButtonGuest({
	className,
}: {
	className?: string;
}): JSX.Element {
	const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
	const language = useLanguageRoute();

	return (
		<>
			<button
				className={clsx(styles.link, className)}
				onClick={(e) => {
					e.preventDefault();
					setIsGuestModalOpen(true);
				}}
			>
				<FormattedMessage
					id="molecule-buttonGuest__label"
					defaultMessage="Continue as guest"
				/>
				<Icon />
			</button>
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
							href={makeRegisterRoute(language)}
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
							href={makeLoginRoute(language)}
							type="primary"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelLogIn"
									defaultMessage="Log in"
								/>
							}
						/>
						<Link href={makeDiscoverRoute(language)}>
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
