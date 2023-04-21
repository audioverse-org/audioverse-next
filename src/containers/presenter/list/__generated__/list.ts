import * as Types from '../../../../__generated__/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type PresenterListEntryFragment = { __typename?: 'Person', canonicalPath: string, givenName: string, surname: string, summary: string, image: { __typename?: 'Image', url: string } | null };

export type GetPersonListLetterCountsQueryVariables = Types.Exact<{
  language: Types.Language;
}>;


export type GetPersonListLetterCountsQuery = { __typename?: 'Query', personLetterCounts: Array<{ __typename?: 'LetterCount', letter: string, count: number }> };

export const PresenterListEntryFragmentDoc = `
    fragment presenterListEntry on Person {
  canonicalPath(useFuturePath: true)
  givenName
  surname
  image {
    url(size: 128)
  }
  summary
}
    `;
export const GetPersonListLetterCountsDocument = `
    query getPersonListLetterCounts($language: Language!) {
  personLetterCounts(language: $language) {
    letter
    count
  }
}
    `;
export const useGetPersonListLetterCountsQuery = <
      TData = GetPersonListLetterCountsQuery,
      TError = unknown
    >(
      variables: GetPersonListLetterCountsQueryVariables,
      options?: UseQueryOptions<GetPersonListLetterCountsQuery, TError, TData>
    ) =>
    useQuery<GetPersonListLetterCountsQuery, TError, TData>(
      ['getPersonListLetterCounts', variables],
      graphqlFetcher<GetPersonListLetterCountsQuery, GetPersonListLetterCountsQueryVariables>(GetPersonListLetterCountsDocument, variables),
      options
    );
import { fetchApi } from '@lib/api/fetchApi' 

export async function getPersonListLetterCounts<T>(
	variables: ExactAlt<T, GetPersonListLetterCountsQueryVariables>
): Promise<GetPersonListLetterCountsQuery> {
	return fetchApi(GetPersonListLetterCountsDocument, { variables });
}