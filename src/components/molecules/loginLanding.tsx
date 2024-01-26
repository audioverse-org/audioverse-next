import React from 'react';

import AndOnboarding from '~components/templates/andOnboarding';

import SocialLogin from './socialLogin';

export default function Login(): JSX.Element {
	//const languageRoute = useLanguageRoute();
	//const router = useRouter();
	return (
		<AndOnboarding>
			<SocialLogin />
		</AndOnboarding>
	);
}
