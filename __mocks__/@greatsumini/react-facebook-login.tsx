import { LoginResponse } from '@greatsumini/react-facebook-login';

type Response = Partial<LoginResponse['authResponse'] & { name: string }>;

let res: Response = {
	accessToken: 'the_access_token',
	name: 'First Last',
	userID: 'the_user_id',
};

export function __setFacebookResponse(response: Partial<Response>): void {
	res = response;
}

export default function FacebookLogin({
	onSuccess,
	render,
}: {
	onSuccess: (response: any) => void;
	render: (renderProps: { onClick: () => void }) => JSX.Element;
}): JSX.Element {
	return render({ onClick: () => onSuccess(res) });
}
