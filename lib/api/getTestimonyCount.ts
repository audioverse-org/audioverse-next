import _ from 'lodash';

import { fetchApi } from '@lib/api/fetchApi';

const query = `
query getTestimonyCount($language: Language!) {
	testimonies(language: $language) {
		aggregate { 
			count 
		}
	}
}
`;

export async function getTestimonyCount(language: string): Promise<number> {
	const variables = { language },
		data = await fetchApi(query, { variables });

	return _.get(data, 'testimonies.aggregate.count') || 0;
}
