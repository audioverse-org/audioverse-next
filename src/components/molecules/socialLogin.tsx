import React, { useCallback, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useGoogleLogin } from 'react-google-login';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '@lib/constants';
import { setSessionToken } from '@lib/cookies';
import {
	useRegisterSocialMutation,
	UserSocialServiceName,
} from '@lib/generated/graphql';
import useDidUnmount from '@lib/useDidUnmount';

import Button from './button';
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

	const setGoogleError = useCallback(() => {
		setErrors(['Error: Google login was unsuccessful']);
	}, []);

	const { signIn } = useGoogleLogin({
		clientId: GOOGLE_CLIENT_ID,
		onFailure: setGoogleError,
		onSuccess: (response) => {
			if (!('googleId' in response)) return setGoogleError();

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

			<div className={styles.buttonRow}>
				<FacebookLogin
					appId={FACEBOOK_APP_ID}
					render={(renderProps) => (
						<Button
							type="primary"
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
						/>
					)}
					callback={(response) => {
						if (!('userID' in response)) {
							const status = response?.status || 'Error';
							setErrors([`${status}: Facebook login was unsuccessful`]);
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
					type="primary"
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
				/>
			</div>
		</>
	);
}
