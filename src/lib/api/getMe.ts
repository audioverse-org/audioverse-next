import { fetchApi } from '@lib/api/fetchApi';

const query = `
	query getMe {
		me {
			user {
				givenName
			}
		}
	}
`;

export async function getMe(): Promise<User> {
	const data = await fetchApi(query);

	return data?.me?.user;
}
