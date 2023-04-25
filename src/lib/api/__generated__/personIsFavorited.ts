import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type PersonIsFavoritedQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type PersonIsFavoritedQuery = { __typename?: 'Query', person: { __typename?: 'Person', viewerHasFavorited: boolean } | null };


export const PersonIsFavoritedDocument = `
    query personIsFavorited($id: ID!) {
  person(id: $id) {
    viewerHasFavorited
  }
}
    `;
export const usePersonIsFavoritedQuery = <
      TData = PersonIsFavoritedQuery,
      TError = unknown
    >(
      variables: PersonIsFavoritedQueryVariables,
      options?: UseQueryOptions<PersonIsFavoritedQuery, TError, TData>
    ) =>
    useQuery<PersonIsFavoritedQuery, TError, TData>(
      ['personIsFavorited', variables],
      graphqlFetcher<PersonIsFavoritedQuery, PersonIsFavoritedQueryVariables>(PersonIsFavoritedDocument, variables),
      options
    );
export const useInfinitePersonIsFavoritedQuery = <
      TData = PersonIsFavoritedQuery,
      TError = unknown
    >(
      variables: PersonIsFavoritedQueryVariables,
      options?: UseInfiniteQueryOptions<PersonIsFavoritedQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<PersonIsFavoritedQuery, TError, TData>(
      ['personIsFavorited.infinite', variables],
      (metaData) => graphqlFetcher<PersonIsFavoritedQuery, PersonIsFavoritedQueryVariables>(PersonIsFavoritedDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function personIsFavorited<T>(
	variables: ExactAlt<T, PersonIsFavoritedQueryVariables>
): Promise<PersonIsFavoritedQuery> {
	return fetchApi(PersonIsFavoritedDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		personIsFavorited: ExactAlt<T, PersonIsFavoritedQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['personIsFavorited', () => personIsFavorited(vars.personIsFavorited)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}