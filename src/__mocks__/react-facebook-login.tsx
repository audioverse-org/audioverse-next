import React from 'react';
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

export function __setFacebookResponse(response: Response): void {
	res = response;
}

export default function FacebookLogin({
	callback,
	textButton,
}: {
	callback: (response: any) => void;
	textButton: string;
}): JSX.Element {
	return <button onClick={() => callback(res)}>{textButton}</button>;
}
