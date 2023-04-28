import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetWithAuthGuardDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetWithAuthGuardDataQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', email: string, name: string } } | null };


export const GetWithAuthGuardDataDocument = `
    query getWithAuthGuardData {
  me {
    user {
      email
      name
    }
  }
}
    `;
export const useGetWithAuthGuardDataQuery = <
      TData = GetWithAuthGuardDataQuery,
      TError = unknown
    >(
      variables?: GetWithAuthGuardDataQueryVariables,
      options?: UseQueryOptions<GetWithAuthGuardDataQuery, TError, TData>
    ) =>
    useQuery<GetWithAuthGuardDataQuery, TError, TData>(
      variables === undefined ? ['getWithAuthGuardData'] : ['getWithAuthGuardData', variables],
      graphqlFetcher<GetWithAuthGuardDataQuery, GetWithAuthGuardDataQueryVariables>(GetWithAuthGuardDataDocument, variables),
      options
    );
export const useInfiniteGetWithAuthGuardDataQuery = <
      TData = GetWithAuthGuardDataQuery,
      TError = unknown
    >(
      variables?: GetWithAuthGuardDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetWithAuthGuardDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetWithAuthGuardDataQuery, TError, TData>(
      variables === undefined ? ['getWithAuthGuardData.infinite'] : ['getWithAuthGuardData.infinite', variables],
      (metaData) => graphqlFetcher<GetWithAuthGuardDataQuery, GetWithAuthGuardDataQueryVariables>(GetWithAuthGuardDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getWithAuthGuardData<T>(
	variables: ExactAlt<T, GetWithAuthGuardDataQueryVariables>
): Promise<GetWithAuthGuardDataQuery> {
	return fetchApi(GetWithAuthGuardDataDocument, { variables });
}
import { QueryClient, QueryKey } from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getWithAuthGuardData: ExactAlt<T, GetWithAuthGuardDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	const promises = [
		client.prefetchQuery(['getWithAuthGuardData', vars.getWithAuthGuardData], () => getWithAuthGuardData(vars.getWithAuthGuardData), options),
		client.prefetchInfiniteQuery(['getWithAuthGuardData.infinite', vars.getWithAuthGuardData], () => getWithAuthGuardData(vars.getWithAuthGuardData), options),
	]

	await Promise.all(promises);
	
	return client;
}