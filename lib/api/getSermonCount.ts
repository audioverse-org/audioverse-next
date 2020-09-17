import _ from 'lodash';

import { fetchApi } from '@lib/api/fetchApi';

const query = `
query getSermonCount($language: Language!) {
	sermons(language: $language) {
		aggregate { 
			count 
		}
	}
}
`;

export async function getSermonCount(language: string): Promise<number> {
	const variables = { language },
		data = await fetchApi(query, { variables });

	return _.get(data, 'sermons.aggregate.count') || 0;
}
