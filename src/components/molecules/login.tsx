import { useRouter } from 'next/router';
import React from 'react';

import AndOnboarding from '@components/templates/andOnboarding';
import root from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import LoginForm from './loginForm';
import SocialLogin from './socialLogin';

export default function Login(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const router = useRouter();
	return (
		<AndOnboarding>
			<SocialLogin />
			<LoginForm
				showRegister={() =>
					router.push(
						root.lang(languageRoute).account.register.get({
							params: {
								back: router.query.back,
							},
						})
					)
				}
			/>
		</AndOnboarding>
	);
}
