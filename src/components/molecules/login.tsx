import clsx from 'clsx';
import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import SocialLogin from '@components/molecules/socialLogin';
import Modal from '@components/organisms/modal';
import AndOnboarding from '@components/templates/andOnboarding';
import { login } from '@lib/api/login';
import { makeRegisterRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import Button from './button';
import ButtonGuest from './buttonGuest';
import Input from './form/input';
import { useLoginForgotPasswordMutation } from './login.generated';
import styles from './login.module.scss';

export default function Login(): JSX.Element {
	const queryClient = useQueryClient();
	const intl = useIntl();
	const languageRoute = useLanguageRoute();

	const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
		useState(false);
	const [hasSentPasswordReset, setHasSentPasswordReset] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [resetEmail, setResetEmail] = useState('');
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
							setIsResetPasswordModalOpen(true);
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
					<ButtonGuest className={styles.guestLink} />
				</div>
			</form>
			<Modal
				open={isResetPasswordModalOpen}
				onClose={() => setIsResetPasswordModalOpen(false)}
				title={
					<FormattedMessage
						id="loginForm-reset__modalTitle"
						defaultMessage="Reset password"
					/>
				}
				actions={
					hasSentPasswordReset ? (
						<Button
							onClick={() => {
								setIsResetPasswordModalOpen(false);
								setHasSentPasswordReset(false);
							}}
							type="super"
							text={
								<FormattedMessage
									id="loginForm-reset__doneButton"
									defaultMessage="Done"
								/>
							}
						/>
					) : (
						<Button
							onClick={() => {
								mutate({ email: resetEmail });
								setHasSentPasswordReset(true);
							}}
							type="super"
							text={
								<FormattedMessage
									id="loginForm-reset__sendLinkButton"
									defaultMessage="Send reset link"
								/>
							}
						/>
					)
				}
			>
				<p>
					{hasSentPasswordReset ? (
						<FormattedMessage
							id="loginForm-reset__modalParagraphSent"
							defaultMessage="Reset link sent. Check your email and use the link to reset your password."
						/>
					) : (
						<FormattedMessage
							id="loginForm-reset__modalParagraph"
							defaultMessage="Enter the email address associated with your account and we’ll send you a password reset link."
						/>
					)}
				</p>
				{!hasSentPasswordReset && (
					<Input
						label={intl.formatMessage({
							id: 'loginForm-reset__emailLabel',
							defaultMessage: 'Email address',
						})}
						placeholder={intl.formatMessage({
							id: 'loginForm-reset__emailPlaceholder',
							defaultMessage: 'Email address',
						})}
						type="email"
						value={resetEmail}
						setValue={setResetEmail}
					/>
				)}
			</Modal>
		</AndOnboarding>
	);
}
