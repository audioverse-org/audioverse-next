import clsx from 'clsx';
import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import SocialLogin from '@components/molecules/socialLogin';
import AndOnboarding from '@components/templates/andOnboarding';
import { login } from '@lib/api';
import { useLoginForgotPasswordMutation } from '@lib/generated/graphql';
import { makeRegisterRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import Button from './button';
import Input from './input';
import styles from './login.module.scss';

export default function Login(): JSX.Element {
	const queryClient = useQueryClient();
	const intl = useIntl();
	const languageRoute = useLanguageRoute();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [successMessage, setSuccessMessage] = useState('');

	const { mutate } = useLoginForgotPasswordMutation({
		onSuccess: (data) => {
			const errors = data.userRecover.errors;
			if (errors.length) {
				setErrors(errors.map((e) => e.message));
			} else {
				setSuccessMessage(
					intl.formatMessage({
						id: 'loginForm__resetPasswordSuccessMessage',
						defaultMessage: 'Check your email for a password reset link',
						description: 'reset password success message',
					})
				);
			}
		},
		onError: () => {
			setErrors([
				intl.formatMessage({
					id: 'loginForm__resetPasswordErrorMessage',
					defaultMessage:
						'Something went wrong while trying to send a password reset link',
					description: 'reset password error message',
				}),
			]);
		},
	});

	const onSubmit = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		try {
			await login(email, password);
			await queryClient.invalidateQueries();
		} catch (e) {
			setErrors(['Login failed']);
		}
	};

	return (
		<AndOnboarding>
			<SocialLogin
				onSuccess={async () => {
					await queryClient.invalidateQueries();
				}}
			/>

			<form onSubmit={onSubmit} data-testid="loginForm" className={styles.form}>
				{!!errors.length && (
					<ul>
						{errors.map((e) => (
							<li key={e}>{e}</li>
						))}
					</ul>
				)}
				{successMessage && <p>{successMessage}</p>}

				<Input
					label={intl.formatMessage({
						id: 'loginForm__emailLabel',
						defaultMessage: 'Email',
					})}
					placeholder={intl.formatMessage({
						id: 'loginForm__emailPlaceholder',
						defaultMessage: 'jane@example.com',
					})}
					type="email"
					value={email}
					setValue={setEmail}
				/>
				<Input
					label={intl.formatMessage({
						id: 'loginForm__passwordLabel',
						defaultMessage: 'Password',
					})}
					placeholder={intl.formatMessage({
						id: 'loginForm__passwordPlaceholder',
						defaultMessage: '*******',
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
								id="loginForm__loginButton"
								defaultMessage="Login"
								description="login form login button"
							/>
						}
						centered
						className={styles.submit}
					/>
					<a
						onClick={(e) => {
							e.preventDefault();
							mutate({ email });
						}}
						className={clsx(styles.resetPassword, 'decorated')}
					>
						<FormattedMessage
							id="loginForm__forgotPasswordButton"
							defaultMessage="Forgot password?"
							description="login form forgot password button"
						/>
					</a>
					<FormattedMessage
						id="loginForm__signupIntro"
						defaultMessage="Don’t have an account?"
					/>
					<Button
						type="secondary"
						text={
							<FormattedMessage
								id="loginForm__signup"
								defaultMessage="Sign up"
							/>
						}
						href={makeRegisterRoute(languageRoute)}
						centered
						className={styles.signup}
					/>
				</div>
			</form>
		</AndOnboarding>
	);
}
