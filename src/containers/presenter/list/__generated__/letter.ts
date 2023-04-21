import * as Types from '../../../../__generated__/graphql';

import { PresenterListEntryFragmentDoc } from './list';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetPresenterListLetterPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  startsWith: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetPresenterListLetterPageDataQuery = { __typename?: 'Query', persons: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', canonicalPath: string, givenName: string, surname: string, summary: string, image: { __typename?: 'Image', url: string } | null }> | null }, personLetterCounts: Array<{ __typename?: 'LetterCount', letter: string, count: number }> };


export const GetPresenterListLetterPageDataDocument = `
    query getPresenterListLetterPageData($language: Language!, $startsWith: String) {
  persons(
    language: $language
    startsWith: $startsWith
    first: 1500
    orderBy: [{field: NAME, direction: ASC}]
  ) {
    nodes {
      ...presenterListEntry
    }
  }
  personLetterCounts(language: $language) {
    letter
    count
  }
}
    ${PresenterListEntryFragmentDoc}`;
export const useGetPresenterListLetterPageDataQuery = <
      TData = GetPresenterListLetterPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterListLetterPageDataQueryVariables,
      options?: UseQueryOptions<GetPresenterListLetterPageDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterListLetterPageDataQuery, TError, TData>(
      ['getPresenterListLetterPageData', variables],
      graphqlFetcher<GetPresenterListLetterPageDataQuery, GetPresenterListLetterPageDataQueryVariables>(GetPresenterListLetterPageDataDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getPresenterListLetterPageData<T>(
	variables: ExactAlt<T, GetPresenterListLetterPageDataQueryVariables>
): Promise<GetPresenterListLetterPageDataQuery> {
	return fetchApi(GetPresenterListLetterPageDataDocument, { variables });
}