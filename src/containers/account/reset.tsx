import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useResetPasswordMutation } from '@lib/generated/graphql';
import { useQueryString } from '@lib/useQueryString';

function Reset(): JSX.Element {
	const token = useQueryString('token') || '';
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [successMessage, setSuccessMessage] = useState('');
	const intl = useIntl();

	const { mutate } = useResetPasswordMutation({
		onSuccess: (data) => {
			const errors = data.userReset.errors;
			if (errors.length) {
				setErrors(errors.map((e) => e.message));
			} else if (data.userReset.success) {
				setSuccessMessage('Your password was successfully changed');
			}
		},
		onError: () => {
			setErrors([
				intl.formatMessage({
					id: 'reset__errorGeneral',
					defaultMessage:
						'Something went wrong while trying to reset your password',
					description: 'password reset general submission error',
				}),
			]);
		},
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
		<form onSubmit={submit}>
			<ul>
				{errors.map((e) => (
					<li key={e}>{e}</li>
				))}
			</ul>
			<input
				placeholder={intl.formatMessage({
					id: 'reset__passwordPlaceholder',
					defaultMessage: 'password',
					description: 'password reset page password field placeholder',
				})}
				type={'password'}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input
				placeholder={intl.formatMessage({
					id: 'reset__passwordConfirmPlaceholder',
					defaultMessage: 'confirm password',
					description: 'password reset page confirm password field placeholder',
				})}
				type={'password'}
				value={passwordConfirm}
				onChange={(e) => setPasswordConfirm(e.target.value)}
			/>
			<button type="submit">
				<FormattedMessage
					id={'reset__submitButton'}
					defaultMessage={'submit'}
					description={'password reset page submit button'}
				/>
			</button>
		</form>
	);
}

export default Reset;
