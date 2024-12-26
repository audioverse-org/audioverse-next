import { useRouter } from 'next/router';
import React from 'react';

import SocialLogin from '~components/molecules/socialLogin';
import RegisterForm from '~components/organisms/registerForm';
import AndOnboarding from '~components/templates/andOnboarding';
import root from '~lib/routes';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import AndAuthGuard from '~src/components/templates/andAuthGuard';

import LoginRedirect from './loginRedirect';

function Register(): JSX.Element {
	const router = useRouter();
	const languageRoute = useLanguageRoute();
	return (
		<AndAuthGuard
			LoggedOutComponent={() => (
				<AndOnboarding>
					<SocialLogin isRegister />
					<RegisterForm
						showLogin={() =>
							router.push(
								root.lang(languageRoute).account.login.get({
									params: {
										back: router.query.back,
									},
								}),
							)
						}
						onSuccess={() => {
							router.push(root.lang(languageRoute).discover.get());
						}}
					/>
				</AndOnboarding>
			)}
		>
			<LoginRedirect />
		</AndAuthGuard>
	);
}

export default Register;
