import { useRouter } from 'next/router';

import withAuthGuard from '~components/HOCs/withAuthGuard';
import SocialLogin from '~components/molecules/socialLogin';
import RegisterForm from '~components/organisms/registerForm';
import AndOnboarding from '~components/templates/andOnboarding';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import LoginRedirect from './loginRedirect';

function Register(): JSX.Element {
	const router = useRouter();
	const languageRoute = useLanguageRoute();
	return (
		<AndOnboarding>
			<SocialLogin isRegister />
			<RegisterForm
				showLogin={() =>
					router.push(
						root.lang(languageRoute).account.login.get({
							params: {
								back: router.query.back,
							},
						})
					)
				}
				onSuccess={() => router.push(root.lang(languageRoute).discover.get())}
			/>
		</AndOnboarding>
	);
}

export default withAuthGuard(LoginRedirect, Register);
