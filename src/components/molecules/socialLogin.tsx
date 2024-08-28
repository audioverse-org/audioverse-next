import {
	FacebookLoginClient,
	ProfileSuccessResponse,
} from '@greatsumini/react-facebook-login';
import { useGoogleLogin } from '@leecheuk/react-google-login';
import { useQueryClient } from '@tanstack/react-query';
import fafacebook from 'public/img/icons-raw/fa-facebook.svg';
import fagoogle from 'public/img/icons-raw/fa-google.svg';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRegisterSocialMutation } from '~containers/account/__generated__/register';
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '~lib/constants';
import { setSessionToken } from '~lib/cookies';
import useDidUnmount from '~lib/useDidUnmount';
import { UserSocialServiceName } from '~src/__generated__/graphql';
import { analytics } from '~src/lib/analytics';

import Button from './buttonSocial';
import styles from './socialLogin.module.scss';

export default function SocialLogin({
	isRegister,
	onSuccess,
}: {
	onSuccess?: () => void;
	isRegister?: boolean;
}): JSX.Element {
	const [errors, setErrors] = useState<string[]>([]);
	const intl = useIntl();
	const didUnmount = useDidUnmount();
	const queryClient = useQueryClient();

	const { mutate: mutateSocial, isSuccess: isSuccessSocial } =
		useRegisterSocialMutation({
			onSuccess: async (response) => {
				const errors = response?.loginSocial.errors || [];
				const token = response?.loginSocial.authenticatedUser?.sessionToken;

				if (token && !errors.length) {
					setSessionToken(token);
					const user = response?.loginSocial.authenticatedUser?.user;
					analytics.identify(user?.id + '', {
						firstName: user?.givenName,
						lastName: user?.surname,
						email: user?.email,
						source: 'Login',
					});
					onSuccess ? onSuccess() : await queryClient.invalidateQueries();
				} else if (!didUnmount.current) {
					setErrors(errors.map((e) => e.message));
				}
			},
		});

	useEffect(() => {
		const initFacebook = async () => {
			await FacebookLoginClient.loadSdk('en');
			window.fbAsyncInit = () =>
				FacebookLoginClient.init({ appId: FACEBOOK_APP_ID, version: 'v16.0' });
		};

		initFacebook();
	}, []);

	const { signIn } = useGoogleLogin({
		clientId: GOOGLE_CLIENT_ID,
		onFailure: (error) => {
			console.log('Google oAuth error');
			console.log(error);
			// TODO: Figure out error format and display it
		},
		onSuccess: (response) => {
			if (!('googleId' in response)) {
				// response is of type GoogleLoginResponseOffline
				// TODO: set error message
				return;
			}

			const socialId = response.googleId;
			const socialToken = response.accessToken;
			const givenName = response.profileObj.givenName;
			const surname = response.profileObj.familyName;

			mutateSocial({
				socialName: UserSocialServiceName.Google,
				socialId,
				socialToken,
				givenName,
				surname,
			});
		},
	});

	if (isSuccessSocial && !errors.length) {
		return (
			<p className={styles.centerTxt}>
				<FormattedMessage
					id="socialLogin__successMessage"
					defaultMessage="success"
					description="social login success message"
				/>
			</p>
		);
	}

	return (
		<>
			{!!errors.length && (
				<ul>
					{errors.map((e) => (
						<li key={e}>{e}</li>
					))}
				</ul>
			)}

			<div className={styles.buttonCol}>
				<Button
					type="secondary"
					text={
						isRegister
							? intl.formatMessage({
									id: 'socialLogin__registerFacebookButton',
									defaultMessage: 'Sign up with Facebook',
								})
							: intl.formatMessage({
									id: 'socialLogin__loginFacebookButton',
									defaultMessage: 'Login with Facebook',
								})
					}
					onClick={() => {
						FacebookLoginClient.login(
							(response) => {
								const { authResponse } = response;

								if (!authResponse) {
									setErrors([
										`${response.status}: Failed to login with Facebook`,
									]);
									return;
								}

								FacebookLoginClient.getProfile(
									(response) => {
										const isSuccessResponse = (
											r: unknown,
										): r is ProfileSuccessResponse => {
											return (
												'first_name' in (r as ProfileSuccessResponse) &&
												'last_name' in (r as ProfileSuccessResponse) &&
												(r as ProfileSuccessResponse)?.id !== undefined
											);
										};

										if (isSuccessResponse(response)) {
											const socialId = authResponse.userID;
											const socialToken = authResponse.accessToken;

											mutateSocial({
												socialName: UserSocialServiceName.Facebook,
												socialId,
												socialToken,
												givenName: response['first_name'],
												surname: response['last_name'],
											});
										}
									},
									{ fields: 'id,first_name,last_name' },
								);
							},
							{ scope: 'public_profile' },
						);
					}}
					centered
					IconLeft={fafacebook}
				/>

				<Button
					type="secondary"
					text={
						isRegister
							? intl.formatMessage({
									id: 'socialLogin__registerGoogleButton',
									defaultMessage: 'Sign up with Google',
								})
							: intl.formatMessage({
									id: 'socialLogin__loginGoogleButton',
									defaultMessage: 'Login with Google',
								})
					}
					onClick={signIn}
					centered
					IconLeft={fagoogle}
				/>
			</div>
		</>
	);
}
