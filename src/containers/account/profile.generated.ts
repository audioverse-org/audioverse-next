import * as Types from '../../lib/generated/graphql';

import {
	useQuery,
	UseQueryOptions,
	useMutation,
	UseMutationOptions,
} from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetProfileDataQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetProfileDataQuery = {
	__typename?: 'Query';
	me:
		| {
				__typename?: 'AuthenticatedUser';
				user: {
					__typename?: 'User';
					email: string;
					givenName: string | null | undefined;
					surname: string | null | undefined;
					address1: string | null | undefined;
					address2: string | null | undefined;
					city: string | null | undefined;
					province: string | null | undefined;
					postalCode: string | null | undefined;
					country: string | null | undefined;
				};
		  }
		| null
		| undefined;
};

export type UpdateProfileDataMutationVariables = Types.Exact<{
	email: Types.InputMaybe<Types.Scalars['String']>;
	password: Types.InputMaybe<Types.Scalars['String']>;
	givenName: Types.InputMaybe<Types.Scalars['String']>;
	surname: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type UpdateProfileDataMutation = {
	__typename?: 'Mutation';
	updateMyProfile: {
		__typename?: 'AuthenticatedUserPayload';
		errors: Array<{ __typename?: 'InputValidationError'; message: string }>;
		authenticatedUser:
			| {
					__typename?: 'AuthenticatedUser';
					user: {
						__typename?: 'User';
						email: string;
						givenName: string | null | undefined;
						surname: string | null | undefined;
						address1: string | null | undefined;
						address2: string | null | undefined;
						city: string | null | undefined;
						province: string | null | undefined;
						postalCode: string | null | undefined;
						country: string | null | undefined;
					};
			  }
			| null
			| undefined;
	};
};

export type ProfileFragment = {
	__typename?: 'User';
	email: string;
	givenName: string | null | undefined;
	surname: string | null | undefined;
	address1: string | null | undefined;
	address2: string | null | undefined;
	city: string | null | undefined;
	province: string | null | undefined;
	postalCode: string | null | undefined;
	country: string | null | undefined;
};

export const ProfileFragmentDoc = `
    fragment profile on User {
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
		['getProfileData', variables],
		graphqlFetcher<GetProfileDataQuery, GetProfileDataQueryVariables>(
			GetProfileDataDocument,
			variables
		),
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
>(
	options?: UseMutationOptions<
		UpdateProfileDataMutation,
		TError,
		UpdateProfileDataMutationVariables,
		TContext
	>
) =>
	useMutation<
		UpdateProfileDataMutation,
		TError,
		UpdateProfileDataMutationVariables,
		TContext
	>(
		(variables?: UpdateProfileDataMutationVariables) =>
			graphqlFetcher<
				UpdateProfileDataMutation,
				UpdateProfileDataMutationVariables
			>(UpdateProfileDataDocument, variables)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

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
