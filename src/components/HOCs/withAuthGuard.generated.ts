import * as Types from '../../lib/generated/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetWithAuthGuardDataQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetWithAuthGuardDataQuery = {
	__typename?: 'Query';
	me:
		| {
				__typename?: 'AuthenticatedUser';
				user: { __typename?: 'User'; email: string; name: string };
		  }
		| null
		| undefined;
};

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
		['getWithAuthGuardData', variables],
		graphqlFetcher<
			GetWithAuthGuardDataQuery,
			GetWithAuthGuardDataQueryVariables
		>(GetWithAuthGuardDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetWithAuthGuardDataDocument = `query getWithAuthGuardData{me{user{email name}}}`;
export async function getWithAuthGuardData<T>(
	variables: ExactAlt<T, GetWithAuthGuardDataQueryVariables>
): Promise<GetWithAuthGuardDataQuery> {
	return fetchApi(GetWithAuthGuardDataDocument, { variables });
}
