import { fetchAPI } from '@lib/api/fetchAPI';
import _ from 'lodash';

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
		data = await fetchAPI(query, { variables });

	return _.get(data, 'testimonies.aggregate.count') || 0;
}
