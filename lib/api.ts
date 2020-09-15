import _ from 'lodash';

const API_URL = 'https://graphql-staging.audioverse.org/graphql';

async function fetchAPI(query: string, { variables = {} } = {}) {
	const headers = { 'Content-Type': 'application/json' };

	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const json = await res.json();
	if (json.errors) {
		console.error({
			query,
			variables,
			errors: json.errors,
		});
		throw new Error('Failed to fetch API');
	}
	return json.data;
}

export async function getSermons(
	language: string,
	{ offset = undefined, first = 1000 }: { offset?: number; first?: number } = {}
): Promise<{ nodes: Sermon[] }> {
	const data = await fetchAPI(
		`
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
  `,
		{
			variables: {
				language,
				offset,
				first,
			},
		}
	);
	return data && data.sermons;
}

export async function getSermon(id: number | string): Promise<Sermon> {
	const data = await fetchAPI(
		`
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
  `,
		{
			variables: {
				id,
			},
		}
	);
	return data && data.sermon;
}

export async function getSermonCount(language: string): Promise<number> {
	const data = fetchAPI(
		`
	query getSermonCount($language: Language!) {
    sermons(language: $language) {
      aggregate { 
        count 
      }
    }
	}
	`,
		{
			variables: {
				language,
			},
		}
	);
	return _.get(data, 'sermons.aggregate.count') || 0;
}
