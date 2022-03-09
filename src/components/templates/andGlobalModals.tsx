import dynamic from 'next/dynamic';
import React, { ReactNode, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQueryClient } from 'react-query';

import Button from '@components/molecules/button';
import { refetchUserQueries } from '@lib/api';
import { UnreachableCaseError } from '@lib/typeHelpers';

import styles from './andGlobalModals.module.scss';

export type GlobalModalsContextType = {
	challengeAuth: (onConfirm: () => unknown) => void;
	confirmRemoveFavorite: (onConfirm: () => unknown) => void;
};

export const GlobalModalsContext = React.createContext<GlobalModalsContextType>(
	{
		challengeAuth: () => undefined,
		confirmRemoveFavorite: () => void 0,
	}
);

const LazyModal = dynamic(() => import('../organisms/modal'));
const LazyModalRegisterForm = dynamic(
	() => import('../organisms/modalRegisterForm')
);
const LazyModalLoginForm = dynamic(() => import('../organisms/modalLoginForm'));

interface AndGlobalModalsProps {
	children: ReactNode;
}

export default function AndGlobalModals({
	children,
}: AndGlobalModalsProps): JSX.Element {
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = useState(false);
	const [whichModal, setWhichModal] = useState<
		'auth' | 'confirmRemoveFavorite'
	>('auth');
	const [onConfirm, setOnConfirm] = useState<undefined | (() => unknown)>(
		undefined
	);
	const [authState, setAuthState] = useState<'intro' | 'register' | 'login'>(
		'intro'
	);

	const handleClose = () => {
		setIsOpen(false);
	};

	const globalModalsContext: GlobalModalsContextType = {
		challengeAuth: (callback) => {
			setWhichModal('auth');
			setIsOpen(true);
			setOnConfirm(() => callback);
			setAuthState('intro');
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
			title =
				authState === 'register' ? (
					<FormattedMessage
						id="andGlobalModals__authRegisterTitle"
						defaultMessage="Create Account"
					/>
				) : authState === 'login' ? (
					<FormattedMessage
						id="andGlobalModals__authLoginTitle"
						defaultMessage="Login"
					/>
				) : (
					<FormattedMessage
						id="andGlobalModals__authTitle"
						defaultMessage="Create a Free Account"
					/>
				);
			content =
				authState === 'register' ? (
					<LazyModalRegisterForm
						onSuccess={async () => {
							handleClose();
							onConfirm && onConfirm();
							await refetchUserQueries(queryClient);
						}}
						showLogin={() => setAuthState('login')}
					/>
				) : authState === 'login' ? (
					<LazyModalLoginForm
						onSuccess={async () => {
							handleClose();
							onConfirm && onConfirm();
							await refetchUserQueries(queryClient);
						}}
						showRegister={() => setAuthState('register')}
					/>
				) : (
					<>
						<p>
							<FormattedMessage
								id="andGlobalModals__authCopy"
								defaultMessage="Create a free account or login to access the Library features, like saving, viewing your history, and syncing across devices."
							/>
						</p>
						<div className={styles.buttonRow}>
							<Button
								type="super"
								onClick={() => setAuthState('register')}
								text={
									<FormattedMessage
										id="andGlobalModals__createAccount"
										defaultMessage="Create Account"
									/>
								}
							/>
							<Button
								type="primary"
								onClick={() => setAuthState('login')}
								text={
									<FormattedMessage
										id="andGlobalModals__logIn"
										defaultMessage="Log in"
									/>
								}
							/>
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
								onConfirm && onConfirm();
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
		<GlobalModalsContext.Provider value={globalModalsContext}>
			{children}
			<LazyModal open={isOpen} onClose={handleClose} title={title}>
				{content}
			</LazyModal>
		</GlobalModalsContext.Provider>
	);
}
