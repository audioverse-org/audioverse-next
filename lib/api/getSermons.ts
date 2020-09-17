import { fetchApi } from '@lib/api/fetchApi';

const query = `
query getSermons($language: Language!, $offset: Int, $first: Int!) {
	sermons(language: $language, first: $first, offset: $offset, orderBy: {direction: DESC, field: CREATED_AT}) {
		nodes {
			...SermonsFragment
		}
		pageInfo {
			hasNextPage
			endCursor
		}
		aggregate {
			count
		}
	}
}

fragment SermonsFragment on Recording {
	id
	title
	duration
	imageWithFallback {
		url(size: 50)
	}
	persons {
		name
	}
	recordingDate
}
`;

export async function getSermons(
	language: string,
	{ offset = undefined, first = 1000 }: { offset?: number; first?: number } = {}
): Promise<{ nodes: Sermon[] }> {
	const variables = { language, offset, first },
		data = await fetchApi(query, { variables });

	return data?.sermons;
}
