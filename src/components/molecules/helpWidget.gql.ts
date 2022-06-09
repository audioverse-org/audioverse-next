// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetHelpWidgetDataQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetHelpWidgetDataQuery = {
	__typename?: 'Query';
	me?: {
		__typename?: 'AuthenticatedUser';
		user: {
			__typename?: 'User';
			name: string;
			email: string;
			image?: { __typename?: 'Image'; url: any } | null;
		};
	} | null;
};

export const GetHelpWidgetDataDocument = `
    query getHelpWidgetData {
  me {
    user {
      name
      image {
        url(size: 200)
      }
      email
    }
  }
}
    `;
export const useGetHelpWidgetDataQuery = <
	TData = GetHelpWidgetDataQuery,
	TError = unknown
>(
	variables?: GetHelpWidgetDataQueryVariables,
	options?: UseQueryOptions<GetHelpWidgetDataQuery, TError, TData>
) =>
	useQuery<GetHelpWidgetDataQuery, TError, TData>(
		variables === undefined
			? ['getHelpWidgetData']
			: ['getHelpWidgetData', variables],
		graphqlFetcher<GetHelpWidgetDataQuery, GetHelpWidgetDataQueryVariables>(
			GetHelpWidgetDataDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getHelpWidgetData<T>(
	variables: ExactAlt<T, GetHelpWidgetDataQueryVariables>
): Promise<GetHelpWidgetDataQuery> {
	return fetchApi(GetHelpWidgetDataDocument, { variables });
}
