import {
	LoginResponse,
	LoginStatus,
	ProfileSuccessResponse,
} from '@greatsumini/react-facebook-login';

let profileRes: ProfileSuccessResponse = {
	id: 'the_user_id',
	email: 'foo@bar.com',
	name: 'First Last',
};

let res: LoginResponse = {
	status: LoginStatus.Connected,
	authResponse: {
		accessToken: 'the_access_token',
		userID: 'the_user_id',
		expiresIn: '1724768367',
		reauthorize_required_in: '10000',
		signedRequest: 'asdf',
	},
};

export default function FacebookLogin({
	onFail,
	onProfileSuccess,
	render,
}: {
	onFail: (response: any) => void;
	onProfileSuccess: (response: any) => void;
	render: (renderProps: { onClick: () => void }) => JSX.Element;
}): JSX.Element {
	return render({ onClick: () => onProfileSuccess(profileRes) });
}
