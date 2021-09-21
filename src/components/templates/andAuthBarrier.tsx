import { Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Button from '@components/molecules/button';
import IconButton from '@components/molecules/iconButton';
import { BaseColors } from '@lib/constants';
import { makeLoginRoute, makeRegisterRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconClose from '../../../public/img/fa-times.svg';

import styles from './andAuthBarrier.module.scss';

export type AuthBarrierContextType = {
	challenge: () => void;
};

export const AuthBarrierContext = React.createContext<AuthBarrierContextType>({
	challenge: () => undefined,
});

interface AndAuthBarrierProps {
	children: ReactNode;
}

export default function AndAuthBarrier({
	children,
}: AndAuthBarrierProps): JSX.Element {
	const intl = useIntl();
	const languageRoute = useLanguageRoute();
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	const authBarrierContext: AuthBarrierContextType = {
		challenge: () => {
			setIsOpen(true);
			throw new Error('Challenging for Authentication');
		},
	};

	return (
		<AuthBarrierContext.Provider value={authBarrierContext}>
			{children}
			<Modal
				open={isOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					className: styles.backdrop,
				}}
			>
				<Fade in={isOpen}>
					<div className={styles.modal}>
						<IconButton
							Icon={IconClose}
							onPress={handleClose}
							color={BaseColors.DARK}
							backgroundColor={BaseColors.WHITE}
							className={styles.close}
							{...{
								'aria-label': intl.formatMessage({
									id: 'andAuthBarrier__close',
									defaultMessage: 'Close',
								}),
							}}
						/>
						<Heading2>
							<FormattedMessage
								id="andAuthBarrier__heading"
								defaultMessage="Member Only Feature"
							/>
						</Heading2>
						<p>
							<FormattedMessage
								id="andAuthBarrier__copy"
								defaultMessage="You can bookmark audio to access later on your account. Other features include adding audio to your library."
							/>
						</p>
						<div className={styles.buttonRow}>
							<Button
								type="super"
								href={makeRegisterRoute(languageRoute)}
								onClick={handleClose}
								text={
									<FormattedMessage
										id="andAuthBarrier__createAccount"
										defaultMessage="Create Account"
									/>
								}
							/>
							<Button
								type="primary"
								href={makeLoginRoute(languageRoute)}
								onClick={handleClose}
								text={
									<FormattedMessage
										id="andAuthBarrier__logIn"
										defaultMessage="Log in"
									/>
								}
							/>
							<a
								onClick={handleClose}
								className={clsx(styles.continueAsGuest, 'decorated')}
							>
								<FormattedMessage
									id="andAuthBarrier__continueAsGuest"
									defaultMessage="Continue as guest"
								/>
							</a>
						</div>
					</div>
				</Fade>
			</Modal>
		</AuthBarrierContext.Provider>
	);
}
