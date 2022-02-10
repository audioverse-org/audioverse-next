import React, { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import withAuthGuard from '@components/HOCs/withAuthGuard';
import Button from '@components/molecules/button';
import Input from '@components/molecules/form/input';
import AccountNav from '@components/organisms/accountNav';
import { refetchUserQueries } from '@lib/api/login';
import {
	useGetProfileDataQuery,
	useUpdateProfileDataMutation,
} from '@lib/generated/graphql';

import styles from './profile.module.scss';

function Profile(): JSX.Element {
	const queryClient = useQueryClient();
	const { data } = useGetProfileDataQuery() || {};

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [givenName, setGivenName] = useState('');
	const [surname, setSurname] = useState('');

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

	return (
		<>
			<Heading1>
				<FormattedMessage
					id="profile__heading"
					defaultMessage="Account Settings"
				/>
			</Heading1>
			<AccountNav current="profile" />
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
		</>
	);
}

export default withAuthGuard(Profile);
