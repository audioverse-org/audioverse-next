import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetHelpWidgetDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetHelpWidgetDataQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', id: string | number, createdAt: string, lastActivity: string, name: string, email: string, language: Types.UserLanguage, timezone: Types.Timezone, address1: string | null, address2: string | null, city: string | null, province: string | null, country: string | null, postalCode: string | null, autoplay: boolean, isSuperuser: boolean } } | null };


export const GetHelpWidgetDataDocument = `
    query getHelpWidgetData {
  me {
    user {
      id
      createdAt
      lastActivity
      name
      email
      language
      timezone
      address1
      address2
      city
      province
      country
      postalCode
      autoplay
      isSuperuser
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
      variables === undefined ? ['getHelpWidgetData'] : ['getHelpWidgetData', variables],
      graphqlFetcher<GetHelpWidgetDataQuery, GetHelpWidgetDataQueryVariables>(GetHelpWidgetDataDocument, variables),
      options
    );
export const useInfiniteGetHelpWidgetDataQuery = <
      TData = GetHelpWidgetDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetHelpWidgetDataQueryVariables,
      variables?: GetHelpWidgetDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetHelpWidgetDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetHelpWidgetDataQuery, TError, TData>(
      variables === undefined ? ['getHelpWidgetData.infinite'] : ['getHelpWidgetData.infinite', variables],
      (metaData) => graphqlFetcher<GetHelpWidgetDataQuery, GetHelpWidgetDataQueryVariables>(GetHelpWidgetDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getHelpWidgetData<T>(
	variables: ExactAlt<T, GetHelpWidgetDataQueryVariables>
): Promise<GetHelpWidgetDataQuery> {
	return fetchApi(GetHelpWidgetDataDocument, { variables });
}