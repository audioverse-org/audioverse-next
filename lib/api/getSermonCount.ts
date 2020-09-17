import { fetchAPI } from '@lib/api/fetchAPI';
import _ from 'lodash';

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
		data = await fetchAPI(query, { variables });

	return _.get(data, 'sermons.aggregate.count') || 0;
}
