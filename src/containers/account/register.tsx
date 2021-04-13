import Cookie from 'js-cookie';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useGoogleLogin } from 'react-google-login';

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
	const [pass, setPass] = useState<string>('');
	const [pass2, setPass2] = useState<string>('');
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
		return <p>loading...</p>;
	}

	if (dataLoggedIn?.me?.user.email) {
		return <p>You are already logged in</p>;
	}

	if ((isSuccess || isSuccessSocial) && !errors.length) {
		return <p>success</p>;
	}

	return (
		<>
			{/* TODO: figure out a better key to use */}
			{/* TODO: show errors inline */}
			<ul>
				{errors.map((e, i) => (
					<li key={i}>{e}</li>
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
				placeholder={'email'}
				required={true}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder={'password'}
				required={true}
				onChange={(e) => {
					setPass(e.target.value);
				}}
			/>
			<input
				type="password"
				placeholder={'confirm password'}
				required={true}
				onChange={(e) => setPass2(e.target.value)}
			/>
			<button
				onClick={() => {
					setErrors([]);
					const newErrors = [];
					if (!email.length) {
						newErrors.push('email is required');
					}
					if (!pass || !pass2) {
						newErrors.push('please type password twice');
					}
					if (pass !== pass2) {
						newErrors.push('passwords do not match');
					}
					if (newErrors.length) {
						setErrors(newErrors);
					}
					mutate({
						email,
						password: pass,
					});
				}}
			>
				sign up
			</button>
		</>
	);
}

export default Register;
