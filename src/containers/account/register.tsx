import { useRouter } from 'next/router';
import React from 'react';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import SocialLogin from '@components/molecules/socialLogin';
import RegisterForm from '@components/organisms/registerForm';
import AndOnboarding from '@components/templates/andOnboarding';
import useLanguageRoute from '@lib/useLanguageRoute';

import LoginRedirect from './loginRedirect';
import { makeLoginRoute } from '@lib/routes/makeLoginRoute';
import { makeDiscoverRoute } from '@lib/routes/makeDiscoverRoute';

function Register(): JSX.Element {
	const router = useRouter();
	const languageRoute = useLanguageRoute();
	return (
		<AndOnboarding>
			<SocialLogin isRegister />
			<RegisterForm
				showLogin={() =>
					router.push(
						makeLoginRoute(languageRoute, router.query.back as string)
					)
				}
				onSuccess={() => router.push(makeDiscoverRoute(languageRoute))}
			/>
		</AndOnboarding>
	);
}

export default withAuthGuard(LoginRedirect, Register);
