import { Alert } from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~components/molecules/button';
import Input from '~components/molecules/form/input';
import { useRegisterMutation } from '~containers/account/__generated__/register';
import { setSessionTokenAndUserId } from '~lib/cookies';
import { gtmPushEvent } from '~src/services/gtm';

import { analytics } from '../../lib/analytics';
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
		isPending,
		data: dataRegister,
		isSuccess,
	} = useRegisterMutation();

	const intl = useIntl();

	useEffect(() => {
		if (!dataRegister) {
			return;
		}

		const {
			signup: { errors, authenticatedUser },
		} = dataRegister;
		if (errors.length) {
			setErrors(errors.map((e) => e.message));
		} else if (authenticatedUser) {
			setSessionTokenAndUserId(
				authenticatedUser.sessionToken,
				authenticatedUser.user.id.toString(),
			);
			analytics.identify(authenticatedUser.user.id + '', {
				firstName: firstName,
				lastName: lastName,
				email: email,
				source: 'Sign up',
			});
			gtmPushEvent('sign_up', {
				sign_up_method: 'email',
			});

			onSuccess();
		}
	}, [dataRegister, onSuccess, firstName, lastName, email]);

	const onSubmit = (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		setErrors([]);

		try {
			mutate({
				email,
				password,
				firstName,
				lastName,
			});
		} catch (e) {
			setErrors([
				(e as { message: string } | undefined)?.message ||
					intl.formatMessage({
						id: 'registerForm__registerFailureMessage',
						defaultMessage: 'Register failed',
					}),
			]);
		}
	};

	if (isSuccess && !errors.length) {
		return (
			<p>
				<FormattedMessage
					id="register__loadingMessage"
					defaultMessage="Loading..."
					description="register loading message"
				/>
			</p>
		);
	}

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			{!!errors.length && (
				<Alert severity="error">
					{errors.map((e) => (
						<div key={e}>{e}</div>
					))}
				</Alert>
			)}

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
				required
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
				required
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
				required
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
				required
			/>

			<div className={styles.actions}>
				<Button
					type="super"
					buttonType="submit"
					text={
						<FormattedMessage
							id="register__submitButton"
							defaultMessage="Sign up"
						/>
					}
					centered
					className={styles.submit}
					disabled={isPending}
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
