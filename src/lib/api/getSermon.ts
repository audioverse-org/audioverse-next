import { fetchApi } from '@lib/api/fetchApi';

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
		duration
		filesize
		mimeType
	}
	videoFiles(allowedContainers: [M4A, M4V, MOV, MP4]) {
		url
		duration
		filesize
		mimeType
	}
	videoStreams: videoFiles(allowedContainers: [M3U8_WEB]) {
		url
		duration
		filesize
		mimeType
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
