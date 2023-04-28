import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetBibleBookContentQueryVariables = Types.Exact<{
  bibleId: Types.Scalars['ID'];
  bookId: Types.Scalars['ID'];
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
      variables: GetBibleBookContentQueryVariables,
      options?: UseInfiniteQueryOptions<GetBibleBookContentQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBibleBookContentQuery, TError, TData>(
      ['getBibleBookContent.infinite', variables],
      (metaData) => graphqlFetcher<GetBibleBookContentQuery, GetBibleBookContentQueryVariables>(GetBibleBookContentDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getBibleBookContent<T>(
	variables: ExactAlt<T, GetBibleBookContentQueryVariables>
): Promise<GetBibleBookContentQuery> {
	return fetchApi(GetBibleBookContentDocument, { variables });
}
import { QueryClient, QueryKey } from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getBibleBookContent: ExactAlt<T, GetBibleBookContentQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	const promises = [
		client.prefetchQuery(['getBibleBookContent', vars.getBibleBookContent], () => getBibleBookContent(vars.getBibleBookContent), options),
		client.prefetchInfiniteQuery(['getBibleBookContent.infinite', vars.getBibleBookContent], () => getBibleBookContent(vars.getBibleBookContent), options),
	]

	await Promise.all(promises);
	
	return client;
}