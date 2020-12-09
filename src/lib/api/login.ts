const query = `
mutation($email: String!, $password: String!) {
	login(input: { email: $email, password: $password }) {
		authenticatedUser {
			sessionToken
		}
	}
}
`;

import { fetchApi } from '@lib/api/fetchApi';

export async function login(email: string, password: string): Promise<boolean> {
	const variables = { email, password },
		data = await fetchApi(query, { variables });

	return !!data.login.authenticatedUser.sessionToken;
}
