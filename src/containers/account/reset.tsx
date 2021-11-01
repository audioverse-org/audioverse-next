import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '@components/molecules/button';
import Input from '@components/molecules/form/input';
import { login } from '@lib/api';
import { useResetPasswordMutation } from '@lib/generated/graphql';
import { makeDiscoverRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useQueryString } from '@lib/useQueryString';

import LogoLarge from '../../../public/img/logo-large.svg';

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
	const intl = useIntl();

	const { mutate } = useResetPasswordMutation({
		onSuccess: (data) => {
			const errors = data.userReset.errors;
			if (errors.length) {
				setErrors(errors.map((e) => e.message));
			} else if (data.userReset.success) {
				setSuccessMessage(
					intl.formatMessage({
						id: 'reset__successMessage',
						defaultMessage: 'Your password was successfully changed',
						description: 'password reset success message',
					})
				);
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

	const submit = (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault();

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
		mutate(
			{ token, password },
			{
				onSuccess: () =>
					login(email, password).then(() =>
						router.push(makeDiscoverRoute(languageRoute))
					),
			}
		);
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
						values={{ email: <strong>{email}</strong> }}
					/>
				</p>
				{!!errors.length && (
					<ul>
						{errors.map((e) => (
							<li key={e}>{e}</li>
						))}
					</ul>
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
					onClick={() => submit()}
					className={styles.submit}
				/>
			</form>
		</div>
	);
}

export default Reset;
