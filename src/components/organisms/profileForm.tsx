import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Button from '~components/molecules/button';
import Checkbox from '~components/molecules/form/checkbox';
import Input from '~components/molecules/form/input';
import Modal from '~components/organisms/modal';
import { refetchUserQueries, resetUserQueries } from '~src/lib/api/login';
import { clearSessionToken } from '~src/lib/cookies';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import {
	useDeleteAccountMutation,
	useGetProfileDataQuery,
	useUpdateProfileDataMutation,
} from './__generated__/profileForm';
import styles from './profileForm.module.scss';

export default function ProfileForm(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const queryClient = useQueryClient();
	const router = useRouter();
	const { data } = useGetProfileDataQuery() || {};

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [givenName, setGivenName] = useState('');
	const [surname, setSurname] = useState('');
	const [showingDeleteConfirm, setShowingDeleteConfirm] = useState(false);

	const [acceptedDeletedImmediately, setAcceptedDeletedImmediately] =
		useState(false);
	const [acceptedLibraryLost, setAcceptedLibraryLost] = useState(false);
	const [acceptedNoLogin, setAcceptedNoLogin] = useState(false);
	const [mustAcknowledgeDisclosures, setMustAcknowledgeDisclosures] =
		useState(false);

	useEffect(() => {
		if (acceptedDeletedImmediately && acceptedLibraryLost && acceptedNoLogin) {
			setMustAcknowledgeDisclosures(false);
		}
	}, [acceptedDeletedImmediately, acceptedLibraryLost, acceptedNoLogin]);

	useEffect(() => {
		if (!showingDeleteConfirm) {
			setAcceptedDeletedImmediately(false);
			setAcceptedLibraryLost(false);
			setAcceptedNoLogin(false);
			setMustAcknowledgeDisclosures(false);
		}
	}, [showingDeleteConfirm]);

	const { mutate } = useUpdateProfileDataMutation({
		onSuccess: () => refetchUserQueries(queryClient),
	});
	const intl = useIntl();

	useEffect(() => {
		const d = data?.me?.user;
		if (!d) {
			return;
		}

		setEmail(d.email);
		setGivenName(d.givenName || '');
		setSurname(d.surname || '');
	}, [data]);

	function submit(e?: FormEvent<HTMLFormElement>) {
		e?.preventDefault();

		return mutate({
			email,
			password: password || null,
			givenName,
			surname,
		});
	}

	const { isLoading, mutate: deleteAccountMutate } = useDeleteAccountMutation({
		onSuccess: async () => {
			clearSessionToken();
			resetUserQueries(queryClient);
			router.push(root.lang(languageRoute).discover.get());
		},
	});

	return (
		<>
			<div className={styles.container}>
				<Heading2 className={styles.subheading}>
					<FormattedMessage id="profile__subheading" defaultMessage="Profile" />
				</Heading2>
				<p className={styles.intro}>
					<FormattedMessage
						id="profile__intro"
						defaultMessage="Add your account information to customize your experience and manage your login information."
					/>
				</p>
				<form onSubmit={submit}>
					<Input
						label={intl.formatMessage({
							id: 'profile__inputLabelForFirstName',
							defaultMessage: 'First name',
							description: 'input label for first name',
						})}
						value={givenName}
						setValue={setGivenName}
					/>

					<Input
						label={intl.formatMessage({
							id: 'profile__inputLabelForLastName',
							defaultMessage: 'Last name',
							description: 'input label for last name',
						})}
						value={surname}
						setValue={setSurname}
					/>

					<Input
						label={intl.formatMessage({
							id: 'profile__inputLabelForEmail',
							defaultMessage: 'Email',
							description: 'input label for email',
						})}
						type="email"
						value={email}
						setValue={setEmail}
					/>

					<Input
						label={intl.formatMessage({
							id: 'profile__inputLabelForPassword',
							defaultMessage: 'Password',
							description: 'input label for password',
						})}
						type="password"
						value={password}
						setValue={setPassword}
					/>
					<Button
						type="secondary"
						text={
							<FormattedMessage
								id="profile__buttonLabelDeleteAccount"
								defaultMessage="Delete Account"
							/>
						}
						className={styles.deleteButton}
						onClick={(e) => {
							e.preventDefault();
							setShowingDeleteConfirm(true);
						}}
					/>

					<div className={styles.buttonRow}>
						<Button
							type="super"
							text={
								<FormattedMessage
									id="profile__buttonLabelSaveChanges"
									defaultMessage="Save changes"
								/>
							}
							onClick={() => submit()}
						/>
					</div>
				</form>
			</div>
			<Modal
				open={showingDeleteConfirm}
				onClose={() => setShowingDeleteConfirm(false)}
				title={
					<FormattedMessage
						id="profile__deleteConfirmTitle"
						defaultMessage="Are you sure?"
					/>
				}
				actions={
					<>
						<Button
							onClick={() => {
								if (
									!acceptedDeletedImmediately ||
									!acceptedLibraryLost ||
									!acceptedNoLogin
								) {
									setMustAcknowledgeDisclosures(true);
								} else {
									setMustAcknowledgeDisclosures(false);
									deleteAccountMutate({ id: data?.me?.user.id as number });
								}
							}}
							type="super"
							text={
								<FormattedMessage
									id="profile__deleteConfirmDelete"
									defaultMessage="Delete account"
								/>
							}
							disabled={isLoading}
						/>
						<Button
							onClick={() => setShowingDeleteConfirm(false)}
							type="primary"
							text={
								<FormattedMessage
									id="profile__deleteConfirmNevermind"
									defaultMessage="Never mind"
								/>
							}
							disabled={isLoading}
						/>
					</>
				}
			>
				<p>
					<FormattedMessage
						id="profile__deleteConfirmIntro"
						defaultMessage="Do you want to delete your account? You cannot undo this action."
					/>
				</p>
				<ul className={styles.deleteConfirmsList}>
					<li>
						<Checkbox
							label={
								<div className={styles.label}>
									<FormattedMessage
										id="profile__deleteConfirmImmediatelyDeleted"
										defaultMessage="I understand that my account will be immediately deleted."
									/>
								</div>
							}
							checked={acceptedDeletedImmediately}
							toggleChecked={() =>
								setAcceptedDeletedImmediately(!acceptedDeletedImmediately)
							}
						/>
					</li>
					<li>
						<Checkbox
							label={
								<div className={styles.label}>
									<FormattedMessage
										id="profile__deleteConfirmLibraryLost"
										defaultMessage="I understand that all my saved library will be lost."
									/>
								</div>
							}
							checked={acceptedLibraryLost}
							toggleChecked={() => setAcceptedLibraryLost(!acceptedLibraryLost)}
						/>
					</li>
					<li>
						<Checkbox
							label={
								<div className={styles.label}>
									<FormattedMessage
										id="profile__deleteConfirmNoLogin"
										defaultMessage="I understand that I will no longer be able to log in unless I create a new account."
									/>
								</div>
							}
							checked={acceptedNoLogin}
							toggleChecked={() => setAcceptedNoLogin(!acceptedNoLogin)}
						/>
					</li>
				</ul>
				{mustAcknowledgeDisclosures && (
					<p className={styles.acknowledgeStatements}>
						<FormattedMessage
							id="profile__deleteConfirmAcknowledgeStatements"
							defaultMessage="Please acknowledge all the above statements."
						/>
					</p>
				)}
			</Modal>
		</>
	);
}
