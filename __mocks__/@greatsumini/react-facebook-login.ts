import {
	LoginResponse,
	LoginStatus,
	ProfileSuccessResponse,
} from '@greatsumini/react-facebook-login';

export const FacebookLoginClient = {
	loadSdk: (_: string) => {},
	init: (_: any) => {},
	login: (callback: (res: LoginResponse) => void) =>
		callback({
			status: LoginStatus.Connected,
			authResponse: {
				accessToken: 'the_access_token',
				signedRequest: 'the_signed_request',
				userID: 'the_user_id',
				expiresIn: 'the_expires_in',
				reauthorize_required_in: 'the_reauthorize_required_in',
			},
		}),
	getProfile: (
		callback: (res: ProfileSuccessResponse) => void,
		_: { fields: string },
	) =>
		callback({
			id: 'the_id',
			first_name: 'First',
			last_name: 'Last',
		}),
};
