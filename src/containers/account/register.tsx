import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SocialLogin from '@components/molecules/socialLogin';
import {
	useRegisterIsLoggedInQuery,
	useRegisterMutation,
} from '@lib/generated/graphql';

function Register(): JSX.Element {
	const [errors, setErrors] = useState<string[]>([]);
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const { data: dataLoggedIn, isLoading: isLoadingLoggedIn } =
		useRegisterIsLoggedInQuery({}, { retry: false });

	const {
		mutate,
		isLoading,
		data: dataRegister,
		isSuccess,
	} = useRegisterMutation();

	const intl = useIntl();

	useEffect(() => {
		if (dataRegister?.signup.errors.length) {
			setErrors(dataRegister?.signup.errors.map((e) => e.message));
		}
	}, [dataRegister]);

	if (isLoading || isLoadingLoggedIn) {
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

	if (dataLoggedIn?.me?.user.email) {
		return <p>You are already logged in</p>;
	}

	if (isSuccess && !errors.length) {
		// TODO: Consider doing a redirect.
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
			<SocialLogin />

			<p>or</p>

			{/* TODO: show errors inline */}
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
						password,
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
