import Cookie from 'js-cookie';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useGoogleLogin } from 'react-google-login';
import { FormattedMessage, useIntl } from 'react-intl';

import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '@lib/constants';
import {
	useRegisterIsLoggedInQuery,
	useRegisterMutation,
	useRegisterSocialMutation,
	UserSocialServiceName,
} from '@lib/generated/graphql';

function Register(): JSX.Element {
	const { signIn } = useGoogleLogin({
		clientId: GOOGLE_CLIENT_ID,
		onFailure: (error) => {
			console.log('Google oAuth error');
			console.log(error);
			// TODO: Figure out error format and display it
		},
		onSuccess: (response) => {
			const socialId = _.get(response, 'googleId');
			const socialToken = _.get(response, 'accessToken');
			const givenName = _.get(response, 'profileObj.givenName');
			const surname = _.get(response, 'profileObj.familyName');

			mutateSocial({
				socialName: UserSocialServiceName.Google,
				socialId,
				socialToken,
				givenName,
				surname,
			});
		},
	});

	const [errors, setErrors] = useState<string[]>([]);
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const {
		data: dataLoggedIn,
		isLoading: isLoadingLoggedIn,
	} = useRegisterIsLoggedInQuery({}, { retry: false });

	const {
		mutate,
		isLoading,
		data: dataRegister,
		isSuccess,
	} = useRegisterMutation();
	const {
		mutate: mutateSocial,
		data: dataSocial,
		isSuccess: isSuccessSocial,
	} = useRegisterSocialMutation();

	const intl = useIntl();

	useEffect(() => {
		if (dataRegister?.signup.errors.length) {
			setErrors(dataRegister?.signup.errors.map((e) => e.message));
		}
	}, [dataRegister]);

	useEffect(() => {
		const errors = dataSocial?.loginSocial.errors || [];
		const token = dataSocial?.loginSocial.authenticatedUser?.sessionToken;

		if (errors.length) {
			setErrors(errors.map((e) => e.message));
		}

		if (token) {
			Cookie.set('avSession', token);
		}
	}, [dataSocial]);

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

	if ((isSuccess || isSuccessSocial) && !errors.length) {
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
			{/* TODO: show errors inline */}
			<ul>
				{errors.map((e) => (
					<li key={e}>{e}</li>
				))}
			</ul>

			<FacebookLogin
				appId={FACEBOOK_APP_ID}
				textButton={'continue with Facebook'}
				callback={(response) => {
					const name = _.get(response, 'name', '');
					const [givenName, surname] = name.split(' ');
					const socialId = _.get(response, 'userID');
					const socialToken = _.get(response, 'accessToken');
					const status = _.get(response, 'status');

					if (!socialToken) {
						if (status) {
							setErrors([status]);
						}
						return;
					}

					mutateSocial({
						socialName: UserSocialServiceName.Facebook,
						socialId,
						socialToken,
						givenName,
						surname,
					});
				}}
			/>

			<button onClick={signIn}>continue with Google</button>

			<p>or</p>

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
