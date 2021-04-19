import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import SocialLogin from '@components/molecules/socialLogin';
import { login } from '@lib/api';
import { useLoginForgotPasswordMutation } from '@lib/generated/graphql';

export default function Login(): JSX.Element {
	const queryClient = useQueryClient();
	const intl = useIntl();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const { mutate } = useLoginForgotPasswordMutation({
		onSuccess: (data) => {
			const errors = data.userRecover.errors;
			if (errors.length) {
				// TODO: display all errors, not just first
				setError(errors[0].message);
			} else {
				// TODO: localize
				setSuccessMessage('Check your email for a password reset link');
			}
		},
		onError: () => {
			setError(
				'Something went wrong while trying to send a password reset link'
			);
		},
	});

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await login(email, password);
			await queryClient.invalidateQueries();
		} catch (e) {
			setError('Login failed');
		}
	};

	return (
		<>
			<SocialLogin
				onSuccess={async () => {
					await queryClient.invalidateQueries();
				}}
			/>

			<p>
				<FormattedMessage
					id={'loginForm__orSeparator'}
					defaultMessage={'or'}
					description={'login form "or" separator'}
				/>
			</p>

			<form onSubmit={onSubmit} data-testid={'loginForm'}>
				{error ? <p>{error}</p> : null}
				{successMessage ? <p>{successMessage}</p> : null}

				<input
					placeholder={intl.formatMessage({
						id: 'loginForm__emailPlaceholder',
						defaultMessage: 'email',
						description: 'email input placeholder',
					})}
					type={'email'}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					placeholder={intl.formatMessage({
						id: 'loginForm__passwordPlaceholder',
						defaultMessage: 'password',
						description: 'password input placeholder',
					})}
					type={'password'}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button
					onClick={(e) => {
						e.preventDefault();
						mutate({ email });
					}}
				>
					<FormattedMessage
						id={'loginForm__forgotPasswordButton'}
						defaultMessage={'forgot password'}
						description={'login form forgot password button'}
					/>
				</button>
				<button type={'submit'}>
					<FormattedMessage
						id={'loginForm__loginButton'}
						defaultMessage={'login'}
						description={'login form login button'}
					/>
				</button>
			</form>
		</>
	);
}
