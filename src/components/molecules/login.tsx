import { useRouter } from 'next/router';
import React from 'react';

import AndOnboarding from '@components/templates/andOnboarding';
import useLanguageRoute from '@lib/useLanguageRoute';

import LoginForm from './loginForm';
import SocialLogin from './socialLogin';
import { makeRegisterRoute } from '@lib/routes/makeRegisterRoute';

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
