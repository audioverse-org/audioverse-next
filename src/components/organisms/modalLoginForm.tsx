import LoginForm from '~components/molecules/loginForm';
import SocialLogin from '~components/molecules/socialLogin';

type Props = {
	onSuccess: () => Promise<void>;
	showRegister: () => void;
};

export default function ModalLoginForm({
	onSuccess,
	showRegister,
}: Props): JSX.Element {
	return (
		<>
			<SocialLogin onSuccess={onSuccess} />
			<LoginForm
				showRegister={showRegister}
				onSuccess={onSuccess}
				hideGuestButton
			/>
		</>
	);
}
