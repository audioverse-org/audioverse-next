import { fetchApi } from '@lib/api/fetchApi';

const query = `
	meQuery {
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
