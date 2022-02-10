import { useRouter } from 'next/router';
import React from 'react';

import AndOnboarding from '@components/templates/andOnboarding';
import { makeRegisterRoute } from '@lib/routes';
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
						makeRegisterRoute(languageRoute, router.query.back as string)
					)
				}
			/>
		</AndOnboarding>
	);
}
