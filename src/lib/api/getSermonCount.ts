import _ from 'lodash';

import { fetchApi } from '@lib/api/fetchApi';

const query = `
query getSermonCount($language: Language!, $hasVideo: Boolean) {
	sermons(language: $language, hasVideo: $hasVideo) {
		aggregate { 
			count 
		}
	}
}
`;

export async function getSermonCount(
	language: string,
	{ hasVideo = null }: { hasVideo?: boolean | null } = {}
): Promise<number> {
	const variables = { language, hasVideo },
		data = await fetchApi(query, { variables });

	return _.get(data, 'sermons.aggregate.count') || 0;
}
