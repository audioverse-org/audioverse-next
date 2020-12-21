import { fetchApi } from '@lib/api/fetchApi';
import type { Sermon } from 'types';

const query = `
query getSermon($id: ID!) {
	sermon(id: $id) {
		...SermonFragment
	}
}

fragment SermonFragment on Recording {
	id
	title
	persons {
		name
	}
	audioFiles {
		url
	}
	description
	imageWithFallback {
		url(size: 50)
	}
	recordingDate
}
`;

export async function getSermon(id: number | string): Promise<Sermon> {
	const variables = { id },
		data = await fetchApi(query, { variables });

	return data?.sermon;
}
