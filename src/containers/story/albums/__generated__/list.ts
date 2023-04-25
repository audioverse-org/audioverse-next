import * as Types from '../../../../__generated__/graphql';

import { CardSequenceFragmentDoc } from '../../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../../components/molecules/__generated__/personLockup';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetStoriesAlbumsPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
  offset: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetStoriesAlbumsPageDataQuery = { __typename?: 'Query', storySeasons: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };

export type GetStoriesAlbumsPathDataQueryVariables = Types.Exact<{
  language: Types.Language;
}>;


export type GetStoriesAlbumsPathDataQuery = { __typename?: 'Query', storySeasons: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } };


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
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetStoriesAlbumsPageDataQuery = <
      TData = GetStoriesAlbumsPageDataQuery,
      TError = unknown
    >(
      variables: GetStoriesAlbumsPageDataQueryVariables,
      options?: UseQueryOptions<GetStoriesAlbumsPageDataQuery, TError, TData>
    ) =>
    useQuery<GetStoriesAlbumsPageDataQuery, TError, TData>(
      ['getStoriesAlbumsPageData', variables],
      graphqlFetcher<GetStoriesAlbumsPageDataQuery, GetStoriesAlbumsPageDataQueryVariables>(GetStoriesAlbumsPageDataDocument, variables),
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
      graphqlFetcher<GetStoriesAlbumsPathDataQuery, GetStoriesAlbumsPathDataQueryVariables>(GetStoriesAlbumsPathDataDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

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
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getStoriesAlbumsPageData: ExactAlt<T, GetStoriesAlbumsPageDataQueryVariables>,
		getStoriesAlbumsPathData: ExactAlt<T, GetStoriesAlbumsPathDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getStoriesAlbumsPageData', () => getStoriesAlbumsPageData(vars.getStoriesAlbumsPageData)],
		['getStoriesAlbumsPathData', () => getStoriesAlbumsPathData(vars.getStoriesAlbumsPathData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}