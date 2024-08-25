import {
	UseGoogleLoginProps,
	UseGoogleLoginResponse,
} from '@leecheuk/react-google-login';

export function useGoogleLogin(
	input: UseGoogleLoginProps
): Partial<UseGoogleLoginResponse> {
	return {
		signIn: () => {
			if (!input.onSuccess) return;
			input.onSuccess({
				accessToken: 'the_access_token',
				googleId: 'the_user_id',
				profileObj: {
					familyName: 'Last',
					givenName: 'First',
					googleId: 'the_user_id',
				},
			} as any);
		},
	};
}
