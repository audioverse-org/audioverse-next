const f = (input: any) => ({
	signIn: jest.fn(() => {
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
	}),
});

export const useGoogleLogin = jest.fn(f);

beforeEach(() => {
	useGoogleLogin.mockImplementation(f);
});
