import { useRouter } from 'next/router';
import React from 'react';

import AndOnboarding from '~components/templates/andOnboarding';
import root from '~lib/routes';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

import LoginForm from './loginForm';
import SocialLogin from './socialLogin';

export default function Login(): JSX.Element {
	const languageRoute = useLanguageRoute();
	const router = useRouter();

	return (
		<AndOnboarding>
			<SocialLogin
				onSuccess={() => router.push(root.lang(languageRoute).discover.get())}
			/>
			<LoginForm
				onSuccess={() => router.push(root.lang(languageRoute).discover.get())}
				showRegister={() =>
					router.push(
						root.lang(languageRoute).account.register.get({
							params: {
								back: router.query.back,
							},
						}),
					)
				}
			/>
		</AndOnboarding>
	);
}
