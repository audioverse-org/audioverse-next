import { fetchApi } from '@lib/api/fetchApi';
import type { User } from 'types';

// TODO: handle playlist pagination?

const query = `
	query getMe($language: Language) {
		me {
			user {
				givenName
				playlists(language: $language) {
					nodes {
						title
					}
				}
			}
		}
	}
`;

export async function getMe(
	languageId: string | null = null
): Promise<User | undefined> {
	const variables = { language: languageId };
	const data = await fetchApi(query, { variables });

	return data?.me?.user;
}
