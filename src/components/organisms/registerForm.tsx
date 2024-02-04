import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~components/molecules/button';
import Input from '~components/molecules/form/input';
import { useRegisterMutation } from '~containers/account/__generated__/register';
import { setSessionToken } from '~lib/cookies';

import { analytics } from '../atoms/analytics';
import styles from './registerForm.module.scss';

type Props = {
	showLogin: () => void;
	onSuccess: () => void;
	hideGuestButton?: boolean;
};

function RegisterForm({ showLogin, onSuccess }: Props): JSX.Element {
	const [errors, setErrors] = useState<string[]>([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {
		mutate,
		isLoading,
		data: dataRegister,
		isSuccess,
	} = useRegisterMutation();

	const intl = useIntl();

	useEffect(() => {
		if (dataRegister?.signup.errors.length) {
			setErrors(dataRegister?.signup.errors.map((e) => e.message));
		} else if (dataRegister?.signup.authenticatedUser?.sessionToken) {
			setSessionToken(dataRegister?.signup.authenticatedUser?.sessionToken);
			analytics.identify(
				'user_' + dataRegister?.signup.authenticatedUser?.user.id,
				{
					firstName: firstName,
					lastName: lastName,
					email: email,
				}
			);
			analytics.track('User Registered', {
				accountType: 'User',
			});

			onSuccess();
		}
	}, [dataRegister, onSuccess, firstName, lastName, email]);

	const onSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		const newErrors = [];
		if (!email.length) {
			newErrors.push('email is required');
		}
		setErrors(newErrors);
		if (!newErrors.length) {
			mutate({
				email,
				password,
				firstName,
				lastName,
			});
		}
	};

	if (isSuccess && !errors.length) {
		return (
			<p>
				<FormattedMessage
					id="register__loadingMessage"
					defaultMessage="loading..."
					description="register loading message"
				/>
			</p>
		);
	}

	return (
		<form className={styles.form}>
			{/* TODO: show errors inline */}
			<ul>
				{errors.map((e) => (
					<li key={e}>{e}</li>
				))}
			</ul>

			<Input
				label={intl.formatMessage({
					id: 'register__firstNameLabel',
					defaultMessage: 'First name',
				})}
				placeholder={intl.formatMessage({
					id: 'register__firstNamePlaceholder',
					defaultMessage: 'Jane',
				})}
				type="text"
				value={firstName}
				setValue={setFirstName}
			/>
			<Input
				label={intl.formatMessage({
					id: 'register__lastNameLabel',
					defaultMessage: 'Last name',
				})}
				placeholder={intl.formatMessage({
					id: 'register__lastNamePlaceholder',
					defaultMessage: 'Doe',
				})}
				type="text"
				value={lastName}
				setValue={setLastName}
			/>
			<Input
				label={intl.formatMessage({
					id: 'register__emailLabel',
					defaultMessage: 'Email',
				})}
				placeholder={intl.formatMessage({
					id: 'register__emailPlaceholder',
					defaultMessage: 'jane@example.com',
				})}
				type="email"
				value={email}
				setValue={setEmail}
			/>
			<Input
				label={intl.formatMessage({
					id: 'register__passwordLabel',
					defaultMessage: 'Password',
				})}
				placeholder={intl.formatMessage({
					id: 'register__passwordPlaceholder',
					defaultMessage: '∗∗∗∗∗∗∗',
				})}
				type="password"
				value={password}
				setValue={setPassword}
			/>

			<div className={styles.actions}>
				<Button
					type="super"
					onClick={onSubmit}
					text={
						<FormattedMessage
							id="register__submitButton"
							defaultMessage="Sign up"
						/>
					}
					centered
					className={styles.submit}
					disabled={isLoading}
				/>
				<FormattedMessage
					id="register__loginIntro"
					defaultMessage="Already have an account?"
				/>
				<Button
					type="secondary"
					text={
						<FormattedMessage id="register__login" defaultMessage="Login" />
					}
					onClick={(e) => {
						e.preventDefault();
						showLogin();
					}}
					centered
					className={styles.login}
				/>
			</div>
		</form>
	);
}

export default RegisterForm;
