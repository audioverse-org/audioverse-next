import * as Types from '../../../__generated__/graphql';

import { CardPersonFragmentDoc } from '../../../components/molecules/card/__generated__/person';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSearchResultsPersonsQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type GetSearchResultsPersonsQuery = { __typename?: 'Query', persons: { __typename?: 'PersonConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null } };


export const GetSearchResultsPersonsDocument = `
    query getSearchResultsPersons($language: Language!, $term: String!, $first: Int!, $offset: Int!) {
  persons(language: $language, search: $term, first: $first, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      ...cardPerson
    }
  }
}
    ${CardPersonFragmentDoc}`;
export const useGetSearchResultsPersonsQuery = <
      TData = GetSearchResultsPersonsQuery,
      TError = unknown
    >(
      variables: GetSearchResultsPersonsQueryVariables,
      options?: UseQueryOptions<GetSearchResultsPersonsQuery, TError, TData>
    ) =>
    useQuery<GetSearchResultsPersonsQuery, TError, TData>(
      ['getSearchResultsPersons', variables],
      graphqlFetcher<GetSearchResultsPersonsQuery, GetSearchResultsPersonsQueryVariables>(GetSearchResultsPersonsDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getSearchResultsPersons<T>(
	variables: ExactAlt<T, GetSearchResultsPersonsQueryVariables>
): Promise<GetSearchResultsPersonsQuery> {
	return fetchApi(GetSearchResultsPersonsDocument, { variables });
}