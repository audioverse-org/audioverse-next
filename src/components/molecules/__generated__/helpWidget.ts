import * as Types from '../../../__generated__/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
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
import { fetchApi } from '~lib/api/fetchApi' 

export async function getHelpWidgetData<T>(
	variables: ExactAlt<T, GetHelpWidgetDataQueryVariables>
): Promise<GetHelpWidgetDataQuery> {
	return fetchApi(GetHelpWidgetDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getHelpWidgetData: ExactAlt<T, GetHelpWidgetDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getHelpWidgetData', () => getHelpWidgetData(vars.getHelpWidgetData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}