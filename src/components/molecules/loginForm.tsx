import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Alert from '~components/atoms/alert';
import Modal from '~components/organisms/modal';
import { login, refetchUserQueries } from '~lib/api/login';

import { useLoginForgotPasswordMutation } from './__generated__/login';
import Button from './button';
import ButtonGuest from './buttonGuest';
import Input from './form/input';
import styles from './loginForm.module.scss';

type Props = {
	showRegister: () => void;
	onSuccess?: () => void;
	hideGuestButton?: boolean;
};

export default function LoginForm({
	onSuccess,
	showRegister,
	hideGuestButton,
}: Props): JSX.Element {
	const queryClient = useQueryClient();
	const intl = useIntl();

	const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
		useState(false);
	const [hasSentPasswordReset, setHasSentPasswordReset] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [resetEmail, setResetEmail] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [successMessage, setSuccessMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

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
		setIsSubmitting(true);
		try {
			await login(email, password);
			await queryClient.invalidateQueries();
			await refetchUserQueries(queryClient);
			onSuccess && onSuccess();
		} catch (e: unknown) {
			setIsSubmitting(false);
			setErrors([
				(e as { message: string } | undefined)?.message ||
					intl.formatMessage({
						id: 'loginForm__loginFailureMessage',
						defaultMessage: 'Login failed',
					}),
			]);
		}
	};

	return (
		<>
			<form onSubmit={onSubmit} data-testid="loginForm" className={styles.form}>
				{!!errors.length && (
					<Alert className={styles.errorAlert}>
						{errors.map((e) => (
							<div key={e}>{e}</div>
						))}
					</Alert>
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
						disabled={isSubmitting}
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
						onClick={(e) => {
							e.preventDefault();
							showRegister();
						}}
						centered
						className={styles.signup}
					/>
					{!hideGuestButton && <ButtonGuest className={styles.guestLink} />}
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
						/* TODO: This may be a lie, since it appears this message is displayed before the mutation has resolved. If the mutation fails, we don't want to show this success message. */
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
		</>
	);
}
