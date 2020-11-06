import { fetchApi } from '@lib/api/fetchApi';

const query = `
query getSermons($language: Language!, $offset: Int, $first: Int!, $hasVideo: Boolean) {
	sermons(language: $language, hasVideo: $hasVideo, first: $first, offset: $offset, orderBy: {direction: DESC, field: CREATED_AT}) {
		nodes {
			...SermonsFragment
		}
		aggregate {
			count
		}
	}
}

fragment SermonsFragment on Recording {
	id
	title
	description
	duration
	imageWithFallback {
		url(size: 50)
	}
	persons {
		name
		id
	}
	audioFiles {
		url
		duration
		filesize
	}
	videoFiles {
		url
		duration
		filesize
	}
	recordingDate
	canonicalUrl
}
`;

export interface GetSermonsReturnType {
	nodes: Sermon[];
	aggregate: {
		count: number;
	};
}

interface GetSermonsProps {
	offset?: number;
	first?: number;
	hasVideo?: boolean | null;
}

export async function getSermons(
	language: string,
	{ offset = undefined, first = 1000, hasVideo = null }: GetSermonsProps = {}
): Promise<GetSermonsReturnType> {
	const variables = { language, offset, first, hasVideo },
		data = await fetchApi(query, { variables });

	return data?.sermons;
}
