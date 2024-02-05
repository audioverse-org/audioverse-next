import { useQueryClient } from '@tanstack/react-query';
import fafacebook from 'public/img/icons-raw/fa-facebook.svg';
import fagoogle from 'public/img/icons-raw/fa-google.svg';
import React, { useState } from 'react';
import {
	ReactFacebookFailureResponse,
	ReactFacebookLoginInfo,
} from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useGoogleLogin } from 'react-google-login';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRegisterSocialMutation } from '~containers/account/__generated__/register';
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '~lib/constants';
import { setSessionToken } from '~lib/cookies';
import useDidUnmount from '~lib/useDidUnmount';
import { UserSocialServiceName } from '~src/__generated__/graphql';

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
					onSuccess ? onSuccess() : await queryClient.invalidateQueries();
				} else if (!didUnmount.current) {
					setErrors(errors.map((e) => e.message));
				}
			},
		});

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
			<p>
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
				<FacebookLogin
					appId={FACEBOOK_APP_ID}
					render={(renderProps) => (
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
							onClick={renderProps.onClick}
							centered
							IconLeft={fafacebook}
						/>
					)}
					callback={(response) => {
						const isFailure = (
							r: ReactFacebookLoginInfo | ReactFacebookFailureResponse
						): r is ReactFacebookFailureResponse => 'status' in r;

						if (isFailure(response)) {
							setErrors([`${response.status}: Failed to login with Facebook`]);
							return;
						}

						const name = response.name || '';
						const [givenName, surname] = name.split(' ');
						const socialId = response.userID;
						const socialToken = response.accessToken;

						mutateSocial({
							socialName: UserSocialServiceName.Facebook,
							socialId,
							socialToken,
							givenName,
							surname,
						});
					}}
					disableMobileRedirect
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
