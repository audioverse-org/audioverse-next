import * as Types from '../../../lib/generated/graphql';

import { CardSequenceFragmentDoc } from '../../../components/molecules/card/sequence.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetStoriesAlbumsPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
	offset: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetStoriesAlbumsPageDataQuery = {
	__typename?: 'Query';
	storySeasons: {
		__typename?: 'SequenceConnection';
		nodes:
			| Array<{
					__typename?: 'Sequence';
					id: string | number;
					title: string;
					canonicalPath: string;
					contentType: Types.SequenceContentType;
					duration: number;
					summary: string;
					speakers: {
						__typename?: 'PersonConnection';
						nodes:
							| Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
							  }>
							| null
							| undefined;
					};
					sequenceWriters: {
						__typename?: 'PersonConnection';
						nodes:
							| Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
							  }>
							| null
							| undefined;
					};
					allRecordings: {
						__typename?: 'RecordingConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
					};
			  }>
			| null
			| undefined;
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export type GetStoriesAlbumsPathDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetStoriesAlbumsPathDataQuery = {
	__typename?: 'Query';
	storySeasons: {
		__typename?: 'SequenceConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const GetStoriesAlbumsPageDataDocument = `
    query getStoriesAlbumsPageData($language: Language!, $first: Int, $offset: Int) {
  storySeasons(language: $language, first: $first, offset: $offset) {
    nodes {
      ...cardSequence
    }
    aggregate {
      count
    }
  }
}
    ${CardSequenceFragmentDoc}`;
export const useGetStoriesAlbumsPageDataQuery = <
	TData = GetStoriesAlbumsPageDataQuery,
	TError = unknown
>(
	variables: GetStoriesAlbumsPageDataQueryVariables,
	options?: UseQueryOptions<GetStoriesAlbumsPageDataQuery, TError, TData>
) =>
	useQuery<GetStoriesAlbumsPageDataQuery, TError, TData>(
		['getStoriesAlbumsPageData', variables],
		graphqlFetcher<
			GetStoriesAlbumsPageDataQuery,
			GetStoriesAlbumsPageDataQueryVariables
		>(GetStoriesAlbumsPageDataDocument, variables),
		options
	);
export const GetStoriesAlbumsPathDataDocument = `
    query getStoriesAlbumsPathData($language: Language!) {
  storySeasons(language: $language) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetStoriesAlbumsPathDataQuery = <
	TData = GetStoriesAlbumsPathDataQuery,
	TError = unknown
>(
	variables: GetStoriesAlbumsPathDataQueryVariables,
	options?: UseQueryOptions<GetStoriesAlbumsPathDataQuery, TError, TData>
) =>
	useQuery<GetStoriesAlbumsPathDataQuery, TError, TData>(
		['getStoriesAlbumsPathData', variables],
		graphqlFetcher<
			GetStoriesAlbumsPathDataQuery,
			GetStoriesAlbumsPathDataQueryVariables
		>(GetStoriesAlbumsPathDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getStoriesAlbumsPageData<T>(
	variables: ExactAlt<T, GetStoriesAlbumsPageDataQueryVariables>
): Promise<GetStoriesAlbumsPageDataQuery> {
	return fetchApi(GetStoriesAlbumsPageDataDocument, { variables });
}

export async function getStoriesAlbumsPathData<T>(
	variables: ExactAlt<T, GetStoriesAlbumsPathDataQueryVariables>
): Promise<GetStoriesAlbumsPathDataQuery> {
	return fetchApi(GetStoriesAlbumsPathDataDocument, { variables });
}
