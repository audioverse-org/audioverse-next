import { fetchApi } from '@lib/api/fetchApi';
import type { User } from 'types';

const query = `
	query getMe {
		me {
			user {
				givenName
			}
		}
	}
`;

export async function getMe(): Promise<User | undefined> {
	const data = await fetchApi(query);

	return data?.me?.user;
}
