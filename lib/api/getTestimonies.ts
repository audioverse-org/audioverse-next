import { fetchApi } from '@lib/api/fetchApi';

const query = `
query getTestimonies($language: Language!, $offset: Int, $first: Int!) {
	testimonies(language: $language, first: $first, offset: $offset, orderBy: {direction: DESC, field: WRITTEN_DATE}) {
		nodes {
			author
			body
			writtenDate
		}
		aggregate {
			count
		}
	}
}
`;

export interface GetTestimoniesReturnType {
	nodes: Testimony[];
	aggregate: {
		count: number;
	};
}

export async function getTestimonies(
	language: string,
	{ offset = undefined, first = 1000 }: { offset?: number; first?: number } = {}
): Promise<GetTestimoniesReturnType> {
	const variables = { language, offset, first },
		data = await fetchApi(query, { variables });

	return data?.testimonies;
}
