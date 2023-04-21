import * as Types from '../../../__generated__/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
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
import { fetchApi } from '@lib/api/fetchApi' 

export async function getWithAuthGuardData<T>(
	variables: ExactAlt<T, GetWithAuthGuardDataQueryVariables>
): Promise<GetWithAuthGuardDataQuery> {
	return fetchApi(GetWithAuthGuardDataDocument, { variables });
}