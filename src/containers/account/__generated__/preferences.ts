import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetAccountPreferencesDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAccountPreferencesDataQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', autoplay: boolean, language: Types.UserLanguage, preferredAudioQuality: Types.RecordingQuality, timezone: Types.Timezone } } | null };

export type UpdateAccountPreferencesMutationVariables = Types.Exact<{
  autoplay: Types.Scalars['Boolean'];
  language: Types.Language;
  preferredAudioQuality: Types.RecordingQuality;
  timezone: Types.Timezone;
}>;


export type UpdateAccountPreferencesMutation = { __typename?: 'Mutation', updateMyProfile: { __typename?: 'AuthenticatedUserPayload', errors: Array<{ __typename?: 'InputValidationError', message: string }>, authenticatedUser: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', autoplay: boolean, language: Types.UserLanguage, preferredAudioQuality: Types.RecordingQuality, timezone: Types.Timezone } } | null } };

export type PreferencesFragment = { __typename?: 'User', autoplay: boolean, language: Types.UserLanguage, preferredAudioQuality: Types.RecordingQuality, timezone: Types.Timezone };

export const PreferencesFragmentDoc = `
    fragment preferences on User {
  autoplay
  language
  preferredAudioQuality
  timezone
}
    `;
export const GetAccountPreferencesDataDocument = `
    query getAccountPreferencesData {
  me {
    user {
      ...preferences
    }
  }
}
    ${PreferencesFragmentDoc}`;
export const useGetAccountPreferencesDataQuery = <
      TData = GetAccountPreferencesDataQuery,
      TError = unknown
    >(
      variables?: GetAccountPreferencesDataQueryVariables,
      options?: UseQueryOptions<GetAccountPreferencesDataQuery, TError, TData>
    ) =>
    useQuery<GetAccountPreferencesDataQuery, TError, TData>(
      variables === undefined ? ['getAccountPreferencesData'] : ['getAccountPreferencesData', variables],
      graphqlFetcher<GetAccountPreferencesDataQuery, GetAccountPreferencesDataQueryVariables>(GetAccountPreferencesDataDocument, variables),
      options
    );
export const useInfiniteGetAccountPreferencesDataQuery = <
      TData = GetAccountPreferencesDataQuery,
      TError = unknown
    >(
      variables?: GetAccountPreferencesDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetAccountPreferencesDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAccountPreferencesDataQuery, TError, TData>(
      variables === undefined ? ['getAccountPreferencesData.infinite'] : ['getAccountPreferencesData.infinite', variables],
      (metaData) => graphqlFetcher<GetAccountPreferencesDataQuery, GetAccountPreferencesDataQueryVariables>(GetAccountPreferencesDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const UpdateAccountPreferencesDocument = `
    mutation updateAccountPreferences($autoplay: Boolean!, $language: Language!, $preferredAudioQuality: RecordingQuality!, $timezone: Timezone!) {
  updateMyProfile(
    input: {autoplay: $autoplay, language: $language, preferredAudioQuality: $preferredAudioQuality, timezone: $timezone}
  ) {
    errors {
      message
    }
    authenticatedUser {
      user {
        ...preferences
      }
    }
  }
}
    ${PreferencesFragmentDoc}`;
export const useUpdateAccountPreferencesMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateAccountPreferencesMutation, TError, UpdateAccountPreferencesMutationVariables, TContext>) =>
    useMutation<UpdateAccountPreferencesMutation, TError, UpdateAccountPreferencesMutationVariables, TContext>(
      ['updateAccountPreferences'],
      (variables?: UpdateAccountPreferencesMutationVariables) => graphqlFetcher<UpdateAccountPreferencesMutation, UpdateAccountPreferencesMutationVariables>(UpdateAccountPreferencesDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getAccountPreferencesData<T>(
	variables: ExactAlt<T, GetAccountPreferencesDataQueryVariables>
): Promise<GetAccountPreferencesDataQuery> {
	return fetchApi(GetAccountPreferencesDataDocument, { variables });
}

export async function updateAccountPreferences<T>(
	variables: ExactAlt<T, UpdateAccountPreferencesMutationVariables>
): Promise<UpdateAccountPreferencesMutation> {
	return fetchApi(UpdateAccountPreferencesDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getAccountPreferencesData: ExactAlt<T, GetAccountPreferencesDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getAccountPreferencesData', () => getAccountPreferencesData(vars.getAccountPreferencesData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}