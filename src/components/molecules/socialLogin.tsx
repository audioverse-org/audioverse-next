import Cookie from 'js-cookie';
import _ from 'lodash';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useGoogleLogin } from 'react-google-login';
import { FormattedMessage, useIntl } from 'react-intl';

import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '@lib/constants';
import {
	useRegisterSocialMutation,
	UserSocialServiceName,
} from '@lib/generated/graphql';

export default function SocialLogin({
	onSuccess,
}: {
	onSuccess?: () => void;
}): JSX.Element {
	const [errors, setErrors] = useState<string[]>([]);
	const intl = useIntl();

	const {
		mutate: mutateSocial,
		isSuccess: isSuccessSocial,
	} = useRegisterSocialMutation({
		onSuccess: (response) => {
			const errors = response?.loginSocial.errors || [];
			const token = response?.loginSocial.authenticatedUser?.sessionToken;

			if (errors.length) {
				setErrors(errors.map((e) => e.message));
			}

			if (token) {
				Cookie.set('avSession', token);
			}

			onSuccess && onSuccess();
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

	if (isSuccessSocial && !errors.length) {
		return (
			<p>
				<FormattedMessage
					id={'socialLogin__successMessage'}
					defaultMessage={'success'}
					description={'social login success message'}
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

			<FacebookLogin
				appId={FACEBOOK_APP_ID}
				textButton={intl.formatMessage({
					id: 'socialLogin__facebookButton',
					defaultMessage: 'continue with Facebook',
					description: 'social login facebook button',
				})}
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

			<button onClick={signIn}>
				{intl.formatMessage({
					id: 'socialLogin__googleButton',
					defaultMessage: 'continue with Google',
					description: 'social login google button',
				})}
			</button>
		</>
	);
}
