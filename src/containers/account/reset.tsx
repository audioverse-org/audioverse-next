import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Alert from '~components/atoms/alert';
import Button from '~components/molecules/button';
import Input from '~components/molecules/form/input';
import { login } from '~lib/api/login';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { useQueryString } from '~lib/useQueryString';
import LogoLarge from '~public/img/logo-large.svg';

import { useResetPasswordMutation } from './__generated__/reset';
import styles from './reset.module.scss';

function Reset(): JSX.Element {
	const router = useRouter();
	const languageRoute = useLanguageRoute();
	const token = useQueryString('token') || '';
	const email = useQueryString('email') || '';
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [successMessage, setSuccessMessage] = useState('');
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const intl = useIntl();

	const { mutate, isLoading } = useResetPasswordMutation({
		onSuccess: async (data) => {
			const errors = data.userReset.errors;
			if (errors.length) {
				setErrors(errors.map((e) => e.message));
			} else if (data.userReset.success) {
				setSuccessMessage(
					intl.formatMessage({
						id: 'reset__successMessage',
						defaultMessage: 'Your password was successfully changed',
						description: 'password reset success message',
					}),
				);
				setIsLoggingIn(true);
				try {
					await login(email, password);
					return router.push(root.lang(languageRoute).discover.get());
				} catch {
					setErrors([
						intl.formatMessage({
							id: 'reset__errorGeneral',
							defaultMessage:
								'Something went wrong while trying to reset your password',
							description: 'password reset general submission error',
						}),
					]);
					setIsLoggingIn(false);
				}
			}
		},
		onError: ({ errors }: { errors?: Array<{ message: string }> }) => {
			if (errors?.length) {
				setErrors(errors?.map((e) => e?.message));
			} else {
				setErrors([
					intl.formatMessage({
						id: 'reset__errorGeneral',
						defaultMessage:
							'Something went wrong while trying to reset your password',
						description: 'password reset general submission error',
					}),
				]);
			}
		},
		onSettled: () => setIsLoggingIn(false),
	});

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!password || !passwordConfirm) {
			setErrors([
				intl.formatMessage({
					id: 'reset__errorRepeatPassword',
					defaultMessage: 'Please type password twice',
					description: 'password reset page password not repeated error',
				}),
			]);
			return;
		}
		if (password !== passwordConfirm) {
			setErrors([
				intl.formatMessage({
					id: 'reset__errorMismatch',
					defaultMessage: 'Passwords must match',
					description: 'password reset page password mismatch error',
				}),
			]);
			return;
		}
		mutate({ token, password });
	};

	if (successMessage) {
		return <p>{successMessage}</p>;
	}

	return (
		<div className={styles.wrapper}>
			<form onSubmit={submit}>
				<div className={styles.header}>
					<LogoLarge />
				</div>
				<p className={styles.intro}>
					<FormattedMessage
						id="reset__intro"
						defaultMessage="Create a new password for {email}."
						values={{ email: <strong>{email.replace(' ', '+')}</strong> }}
					/>
				</p>
				{!!errors.length && (
					<Alert className={styles.errorAlert}>
						{errors.map((e) => (
							<div key={e}>{e}</div>
						))}
					</Alert>
				)}

				<Input
					label={intl.formatMessage({
						id: 'reset__passwordLabel',
						defaultMessage: 'New password',
					})}
					placeholder={intl.formatMessage({
						id: 'reset__passwordPlaceholder',
						defaultMessage: 'New password',
					})}
					type="password"
					value={password}
					setValue={setPassword}
				/>
				<Input
					label={intl.formatMessage({
						id: 'reset__confirmPasswordLabel',
						defaultMessage: 'Confirm new password',
					})}
					placeholder={intl.formatMessage({
						id: 'reset__confirmPasswordPlaceholder',
						defaultMessage: 'Confirm new password',
					})}
					type="password"
					value={passwordConfirm}
					setValue={setPasswordConfirm}
				/>
				<Button
					type="super"
					text={
						<FormattedMessage id="reset__submitButton" defaultMessage="Login" />
					}
					className={styles.submit}
					disabled={isLoading || isLoggingIn}
				/>
			</form>
		</div>
	);
}

export default Reset;
