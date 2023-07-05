import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetBibleBookContentQueryVariables = Types.Exact<{
  bibleId: Types.Scalars['ID']['input'];
  bookId: Types.Scalars['ID']['input'];
}>;


export type GetBibleBookContentQuery = { __typename?: 'Query', audiobible: { __typename?: 'Bible', book: { __typename?: 'BibleBook', chapters: Array<{ __typename?: 'BibleChapter', id: string | number, text: string }> } } | null };


export const GetBibleBookContentDocument = `
    query getBibleBookContent($bibleId: ID!, $bookId: ID!) {
  audiobible(id: $bibleId) {
    book(id: $bookId) {
      chapters {
        id
        text
      }
    }
  }
}
    `;
export const useGetBibleBookContentQuery = <
      TData = GetBibleBookContentQuery,
      TError = unknown
    >(
      variables: GetBibleBookContentQueryVariables,
      options?: UseQueryOptions<GetBibleBookContentQuery, TError, TData>
    ) =>
    useQuery<GetBibleBookContentQuery, TError, TData>(
      ['getBibleBookContent', variables],
      graphqlFetcher<GetBibleBookContentQuery, GetBibleBookContentQueryVariables>(GetBibleBookContentDocument, variables),
      options
    );
export const useInfiniteGetBibleBookContentQuery = <
      TData = GetBibleBookContentQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetBibleBookContentQueryVariables,
      variables: GetBibleBookContentQueryVariables,
      options?: UseInfiniteQueryOptions<GetBibleBookContentQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBibleBookContentQuery, TError, TData>(
      ['getBibleBookContent.infinite', variables],
      (metaData) => graphqlFetcher<GetBibleBookContentQuery, GetBibleBookContentQueryVariables>(GetBibleBookContentDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getBibleBookContent<T>(
	variables: ExactAlt<T, GetBibleBookContentQueryVariables>
): Promise<GetBibleBookContentQuery> {
	return fetchApi(GetBibleBookContentDocument, { variables });
}