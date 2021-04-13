import React, { useEffect, useState } from 'react';

import { useRegisterMutation } from '@lib/generated/graphql';
import { FormattedMessage, useIntl } from 'react-intl';

function Register(): JSX.Element {
	const [errors, setErrors] = useState<string[]>([]);
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const intl = useIntl();

	const { mutate, isLoading, data, isSuccess } = useRegisterMutation();

	useEffect(() => {
		if (data?.signup.errors.length) {
			setErrors(data?.signup.errors.map((e) => e.message));
		}
	}, [data]);

	if (isLoading) {
		return (
			<p>
				<FormattedMessage
					id={'register__loadingMessage'}
					defaultMessage={'loading...'}
					description={'register loading message'}
				/>
			</p>
		);
	}

	if (isSuccess && !errors.length) {
		return (
			<p>
				<FormattedMessage
					id={'register__successMessage'}
					defaultMessage={'success'}
					description={'register success message'}
				/>
			</p>
		);
	}

	return (
		<>
			<ul>
				{errors.map((e) => (
					<li key={e}>{e}</li>
				))}
			</ul>
			<input
				type="email"
				placeholder={intl.formatMessage({
					id: 'register__emailInputPlaceholder',
					defaultMessage: 'email',
					description: 'register page email input placeholder',
				})}
				required={true}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder={intl.formatMessage({
					id: 'register__passwordInputPlaceholder',
					defaultMessage: 'password',
					description: 'register page password input placeholder',
				})}
				required={true}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input
				type="password"
				placeholder={intl.formatMessage({
					id: 'register__confirmPasswordInputPlaceholder',
					defaultMessage: 'confirm password',
					description: 'register page confirm password input placeholder',
				})}
				required={true}
				onChange={(e) => setPasswordConfirm(e.target.value)}
			/>
			<button
				onClick={() => {
					const newErrors = [];
					if (!email.length) {
						newErrors.push('email is required');
					}
					if (!password || !passwordConfirm) {
						newErrors.push('please type password twice');
					}
					if (password !== passwordConfirm) {
						newErrors.push('passwords do not match');
					}
					setErrors(newErrors);
					mutate({
						email,
						password: password,
					});
				}}
			>
				<FormattedMessage
					id={'register__signUpButton'}
					defaultMessage={'sign up'}
					description={'sign up button label on register page'}
				/>
			</button>
		</>
	);
}

export default Register;
