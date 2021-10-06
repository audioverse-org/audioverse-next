import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@components/molecules/button';
import Modal from '@components/organisms/modal';
import { makeLoginRoute, makeRegisterRoute } from '@lib/routes';
import { UnreachableCaseError } from '@lib/typeHelpers';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './andGlobalModals.module.scss';

export type GlobalModalsContextType = {
	challengeAuth: () => void;
	confirmRemoveFavorite: (onConfirm: () => any) => void;
};

export const GlobalModalsContext = React.createContext<GlobalModalsContextType>(
	{
		challengeAuth: () => undefined,
		confirmRemoveFavorite: () => void 0,
	}
);

interface AndGlobalModalsProps {
	children: ReactNode;
}

export default function AndGlobalModals({
	children,
}: AndGlobalModalsProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const [isOpen, setIsOpen] = useState(false);
	const [whichModal, setWhichModal] = useState<
		'auth' | 'confirmRemoveFavorite'
	>('auth');
	const [onConfirm, setOnConfirm] = useState<any>(undefined);

	const handleClose = () => {
		setIsOpen(false);
	};

	const authBarrierContext: GlobalModalsContextType = {
		challengeAuth: () => {
			setWhichModal('auth');
			setIsOpen(true);
		},
		confirmRemoveFavorite: (callback) => {
			setWhichModal('confirmRemoveFavorite');
			setIsOpen(true);
			setOnConfirm(() => callback);
		},
	};

	let content = undefined;
	let title = undefined;
	switch (whichModal) {
		case 'auth':
			title = (
				<FormattedMessage
					id="andGlobalModals__heading"
					defaultMessage="Member Only Feature"
				/>
			);
			content = (
				<>
					<p>
						<FormattedMessage
							id="andGlobalModals__copy"
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
									id="andGlobalModals__createAccount"
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
									id="andGlobalModals__logIn"
									defaultMessage="Log in"
								/>
							}
						/>
						<a
							onClick={handleClose}
							className={clsx(styles.continueAsGuest, 'decorated')}
						>
							<FormattedMessage
								id="andGlobalModals__continueAsGuest"
								defaultMessage="Continue as guest"
							/>
						</a>
					</div>
				</>
			);
			break;
		case 'confirmRemoveFavorite':
			title = (
				<FormattedMessage
					id="andGlobalModals__confirmRemoveFavorite-heading"
					defaultMessage="Are you sure?"
				/>
			);
			content = (
				<>
					<p>
						<FormattedMessage
							id="andGlobalModals__confirmRemoveFavorite-copy"
							defaultMessage="Do you want to remove this item from your library?"
						/>
					</p>
					<div className={styles.buttonRow}>
						<Button
							type="super"
							onClick={() => {
								onConfirm();
								handleClose();
							}}
							text={
								<FormattedMessage
									id="andGlobalModals__confirmRemoveFavorite-confirm"
									defaultMessage="Remove item"
								/>
							}
						/>
						<Button
							type="primary"
							onClick={handleClose}
							text={
								<FormattedMessage
									id="andGlobalModals__confirmRemoveFavorite-keep"
									defaultMessage="Keep item"
								/>
							}
						/>
					</div>
				</>
			);
			break;
		default:
			throw new UnreachableCaseError(whichModal);
	}

	return (
		<GlobalModalsContext.Provider value={authBarrierContext}>
			{children}
			<Modal open={isOpen} onClose={handleClose} title={title}>
				{content}
			</Modal>
		</GlobalModalsContext.Provider>
	);
}
