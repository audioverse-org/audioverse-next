import * as Types from '../../../__generated__/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
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
import { fetchApi } from '~lib/api/fetchApi' 

export async function getWithAuthGuardData<T>(
	variables: ExactAlt<T, GetWithAuthGuardDataQueryVariables>
): Promise<GetWithAuthGuardDataQuery> {
	return fetchApi(GetWithAuthGuardDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	props: {
		getWithAuthGuardData: ExactAlt<T, GetWithAuthGuardDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getWithAuthGuardData', () => getWithAuthGuardData(props.getWithAuthGuardData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}