import * as Types from '../../../__generated__/graphql';

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetProfileDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetProfileDataQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', id: string | number, email: string, givenName: string | null, surname: string | null, address1: string | null, address2: string | null, city: string | null, province: string | null, postalCode: string | null, country: string | null } } | null };

export type UpdateProfileDataMutationVariables = Types.Exact<{
  email: Types.InputMaybe<Types.Scalars['String']>;
  password: Types.InputMaybe<Types.Scalars['String']>;
  givenName: Types.InputMaybe<Types.Scalars['String']>;
  surname: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UpdateProfileDataMutation = { __typename?: 'Mutation', updateMyProfile: { __typename?: 'AuthenticatedUserPayload', errors: Array<{ __typename?: 'InputValidationError', message: string }>, authenticatedUser: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', id: string | number, email: string, givenName: string | null, surname: string | null, address1: string | null, address2: string | null, city: string | null, province: string | null, postalCode: string | null, country: string | null } } | null } };

export type ProfileFragment = { __typename?: 'User', id: string | number, email: string, givenName: string | null, surname: string | null, address1: string | null, address2: string | null, city: string | null, province: string | null, postalCode: string | null, country: string | null };

export type DeleteAccountMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', userDelete: { __typename?: 'SuccessPayload', success: boolean, errors: Array<{ __typename?: 'InputValidationError', message: string }> } };

export const ProfileFragmentDoc = `
    fragment profile on User {
  id
  email
  givenName
  surname
  address1
  address2
  city
  province
  postalCode
  country
}
    `;
export const GetProfileDataDocument = `
    query getProfileData {
  me {
    user {
      ...profile
    }
  }
}
    ${ProfileFragmentDoc}`;
export const useGetProfileDataQuery = <
      TData = GetProfileDataQuery,
      TError = unknown
    >(
      variables?: GetProfileDataQueryVariables,
      options?: UseQueryOptions<GetProfileDataQuery, TError, TData>
    ) =>
    useQuery<GetProfileDataQuery, TError, TData>(
      variables === undefined ? ['getProfileData'] : ['getProfileData', variables],
      graphqlFetcher<GetProfileDataQuery, GetProfileDataQueryVariables>(GetProfileDataDocument, variables),
      options
    );
export const UpdateProfileDataDocument = `
    mutation updateProfileData($email: String, $password: String, $givenName: String, $surname: String) {
  updateMyProfile(
    input: {email: $email, password: $password, givenName: $givenName, surname: $surname}
  ) {
    errors {
      message
    }
    authenticatedUser {
      user {
        ...profile
      }
    }
  }
}
    ${ProfileFragmentDoc}`;
export const useUpdateProfileDataMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProfileDataMutation, TError, UpdateProfileDataMutationVariables, TContext>) =>
    useMutation<UpdateProfileDataMutation, TError, UpdateProfileDataMutationVariables, TContext>(
      ['updateProfileData'],
      (variables?: UpdateProfileDataMutationVariables) => graphqlFetcher<UpdateProfileDataMutation, UpdateProfileDataMutationVariables>(UpdateProfileDataDocument, variables)(),
      options
    );
export const DeleteAccountDocument = `
    mutation deleteAccount($id: ID!) {
  userDelete(userId: $id, destroyData: true) {
    errors {
      message
    }
    success
  }
}
    `;
export const useDeleteAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteAccountMutation, TError, DeleteAccountMutationVariables, TContext>) =>
    useMutation<DeleteAccountMutation, TError, DeleteAccountMutationVariables, TContext>(
      ['deleteAccount'],
      (variables?: DeleteAccountMutationVariables) => graphqlFetcher<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getProfileData<T>(
	variables: ExactAlt<T, GetProfileDataQueryVariables>
): Promise<GetProfileDataQuery> {
	return fetchApi(GetProfileDataDocument, { variables });
}

export async function updateProfileData<T>(
	variables: ExactAlt<T, UpdateProfileDataMutationVariables>
): Promise<UpdateProfileDataMutation> {
	return fetchApi(UpdateProfileDataDocument, { variables });
}

export async function deleteAccount<T>(
	variables: ExactAlt<T, DeleteAccountMutationVariables>
): Promise<DeleteAccountMutation> {
	return fetchApi(DeleteAccountDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getProfileData: ExactAlt<T, GetProfileDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getProfileData', () => getProfileData(vars.getProfileData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}