import {
	ReactFacebookFailureResponse,
	ReactFacebookLoginInfo,
} from 'react-facebook-login';

type Response =
	| Partial<ReactFacebookLoginInfo>
	| Partial<ReactFacebookFailureResponse>;

let res: Response = {
	accessToken: 'the_access_token',
	id: 'the_id',
	name: 'First Last',
	userID: 'the_user_id',
};

export function __setFacebookResponse(response: Partial<Response>): void {
	res = response;
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
