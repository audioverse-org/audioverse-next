import React from 'react';

import SocialLogin from '@/components/molecules/socialLogin';

import RegisterForm from './registerForm';

type Props = {
	onSuccess: () => Promise<void>;
	showLogin: () => void;
};

export default function ModalRegisterForm({
	onSuccess,
	showLogin,
}: Props): JSX.Element {
	return (
		<>
			<SocialLogin onSuccess={onSuccess} />
			<RegisterForm
				showLogin={showLogin}
				onSuccess={onSuccess}
				hideGuestButton
			/>
		</>
	);
}
