import { Alert } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Modal from '~components/organisms/modal';
import { login, refetchUserQueries } from '~lib/api/login';

import { useLoginForgotPasswordMutation } from './__generated__/login';
import Button from './button';
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
}: Props): JSX.Element {
	const queryClient = useQueryClient();
	const intl = useIntl();

	const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
		useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [resetEmail, setResetEmail] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [successMessage, setSuccessMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { mutate } = useLoginForgotPasswordMutation({
		onSuccess: (data) => {
			const hasErrors = data.userRecover.errors.length > 0;
			if (hasErrors) {
				setErrors([
					intl.formatMessage({
						id: 'loginForm__resetPasswordErrorMessage',
						defaultMessage:
							'Something went wrong while trying to send a password reset link',
						description: 'reset password error message',
					}),
				]);
			} else {
				setSuccessMessage(
					intl.formatMessage({
						id: 'loginForm__resetPasswordSuccessMessage',
						defaultMessage: 'Check your email for a password reset link',
						description: 'reset password success message',
					}),
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
		setErrors([]);

		try {
			await login(email, password);
			await queryClient.invalidateQueries();
			await refetchUserQueries(queryClient);
			onSuccess && onSuccess();
		} catch (e) {
			setIsSubmitting(false);
			setErrors([
				(e as { message: string } | undefined)?.message ||
					intl.formatMessage({
						id: 'loginForm__loginFailureMessage',
						defaultMessage: 'Login failed. Please try again.',
					}),
			]);
		}
	};

	const handleResetPasswordSubmit = (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		console.log('resetEmail', resetEmail);

		if (resetEmail) {
			mutate({ email: resetEmail });
			setIsResetPasswordModalOpen(false);
			setResetEmail('');
		}
	};

	return (
		<>
			<form onSubmit={onSubmit} data-testid="loginForm" className={styles.form}>
				{!!errors.length && (
					<Alert severity="error">
						{errors.map((e) => (
							<div key={e}>{e}</div>
						))}
					</Alert>
				)}

				{successMessage && (
					<Alert severity="info">
						<FormattedMessage
							id="loginForm-reset__modalParagraphSent"
							defaultMessage="Reset link sent. Check your email and use the link to reset your password."
						/>
					</Alert>
				)}

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
					required
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
					required
					minLength={6}
				/>

				<div className={styles.actions}>
					<Button
						type="super"
						buttontype="submit"
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
						defaultMessage="Don't have an account?"
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
			>
				<form
					onSubmit={handleResetPasswordSubmit}
					data-testid="resetPasswordForm"
				>
					<FormattedMessage
						id="loginForm-reset__modalParagraph"
						defaultMessage="Enter the email address associated with your account and we'll send you a password reset link."
					/>

					<Input
						label={intl.formatMessage({
							id: 'loginForm-reset__emailLabel',
							defaultMessage: 'Email address',
						})}
						placeholder={intl.formatMessage({
							id: 'loginForm-reset__emailPlaceholder',
							defaultMessage: 'jane@example.com',
						})}
						type="email"
						value={resetEmail}
						setValue={setResetEmail}
						required
					/>

					<Button
						type="super"
						buttontype="submit"
						text={
							<FormattedMessage
								id="loginForm-reset__sendLinkButton"
								defaultMessage="Send reset link"
							/>
						}
					/>
				</form>
			</Modal>
		</>
	);
}
