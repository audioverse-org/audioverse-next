import { LoginResponse, LoginStatus, ProfileSuccessResponse, SuccessResponse } from '@greatsumini/react-facebook-login';

const res: LoginResponse = {
	status: LoginStatus.Connected,
	authResponse: {
	accessToken: 'the_access_token',
	id: 'the_id',
	name: 'First Last',
	userID: 'the_user_id',
	},
};

export function __setFacebookResponse(response: ProfileSuccessResponse): void {
	res.authResponse = response;
}

export default function FacebookLogin({
	callback,
	render,
}: {
	callback: (response: any) => void;
	render: (renderProps: {onClick: () => void}) => JSX.Element;
}): JSX.Element {
	return render({onClick: () => callback(res)});
}
