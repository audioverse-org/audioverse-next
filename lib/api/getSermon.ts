import { fetchAPI } from '@lib/api/fetchAPI';

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
		data = await fetchAPI(query, { variables });

	return data?.sermon;
}
