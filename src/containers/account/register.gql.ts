// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type RegisterMutationVariables = Types.Exact<{
	email: Types.Scalars['String'];
	password: Types.Scalars['String'];
	firstName: Types.Scalars['String'];
	lastName: Types.Scalars['String'];
}>;

export type RegisterMutation = {
	__typename?: 'Mutation';
	signup: {
		__typename?: 'AuthenticatedUserPayload';
		authenticatedUser?: {
			__typename?: 'AuthenticatedUser';
			sessionToken: string;
		} | null;
		errors: Array<{ __typename?: 'InputValidationError'; message: string }>;
	};
};

export type RegisterSocialMutationVariables = Types.Exact<{
	socialId: Types.Scalars['String'];
	socialName: Types.UserSocialServiceName;
	socialToken: Types.Scalars['String'];
	givenName?: Types.InputMaybe<Types.Scalars['String']>;
	surname?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type RegisterSocialMutation = {
	__typename?: 'Mutation';
	loginSocial: {
		__typename?: 'AuthenticatedUserPayload';
		authenticatedUser?: {
			__typename?: 'AuthenticatedUser';
			sessionToken: string;
		} | null;
		errors: Array<{ __typename?: 'InputValidationError'; message: string }>;
	};
};

export const RegisterDocument = `
    mutation register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  signup(
    input: {email: $email, password: $password, givenName: $firstName, surname: $lastName}
  ) {
    authenticatedUser {
      sessionToken
    }
    errors {
      message
    }
  }
}
    `;
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
	options?: UseMutationOptions<
		RegisterMutation,
		TError,
		RegisterMutationVariables,
		TContext
	>
) =>
	useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
		['register'],
		(variables?: RegisterMutationVariables) =>
			graphqlFetcher<RegisterMutation, RegisterMutationVariables>(
				RegisterDocument,
				variables
			)(),
		options
	);
export const RegisterSocialDocument = `
    mutation registerSocial($socialId: String!, $socialName: UserSocialServiceName!, $socialToken: String!, $givenName: String, $surname: String) {
  loginSocial(
    input: {socialId: $socialId, socialName: $socialName, socialToken: $socialToken, givenName: $givenName, surname: $surname}
  ) {
    authenticatedUser {
      sessionToken
    }
    errors {
      message
    }
  }
}
    `;
export const useRegisterSocialMutation = <TError = unknown, TContext = unknown>(
	options?: UseMutationOptions<
		RegisterSocialMutation,
		TError,
		RegisterSocialMutationVariables,
		TContext
	>
) =>
	useMutation<
		RegisterSocialMutation,
		TError,
		RegisterSocialMutationVariables,
		TContext
	>(
		['registerSocial'],
		(variables?: RegisterSocialMutationVariables) =>
			graphqlFetcher<RegisterSocialMutation, RegisterSocialMutationVariables>(
				RegisterSocialDocument,
				variables
			)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function register<T>(
	variables: ExactAlt<T, RegisterMutationVariables>
): Promise<RegisterMutation> {
	return fetchApi(RegisterDocument, { variables });
}

export async function registerSocial<T>(
	variables: ExactAlt<T, RegisterSocialMutationVariables>
): Promise<RegisterSocialMutation> {
	return fetchApi(RegisterSocialDocument, { variables });
}
