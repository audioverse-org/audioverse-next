import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type RegisterMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  firstName: Types.Scalars['String']['input'];
  lastName: Types.Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthenticatedUserPayload', authenticatedUser: { __typename?: 'AuthenticatedUser', sessionToken: string } | null, errors: Array<{ __typename?: 'InputValidationError', message: string }> } };

export type RegisterSocialMutationVariables = Types.Exact<{
  socialId: Types.Scalars['String']['input'];
  socialName: Types.UserSocialServiceName;
  socialToken: Types.Scalars['String']['input'];
  givenName: Types.InputMaybe<Types.Scalars['String']['input']>;
  surname: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RegisterSocialMutation = { __typename?: 'Mutation', loginSocial: { __typename?: 'AuthenticatedUserPayload', authenticatedUser: { __typename?: 'AuthenticatedUser', sessionToken: string } | null, errors: Array<{ __typename?: 'InputValidationError', message: string }> } };


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
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      ['register'],
      (variables?: RegisterMutationVariables) => graphqlFetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
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
export const useRegisterSocialMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterSocialMutation, TError, RegisterSocialMutationVariables, TContext>) =>
    useMutation<RegisterSocialMutation, TError, RegisterSocialMutationVariables, TContext>(
      ['registerSocial'],
      (variables?: RegisterSocialMutationVariables) => graphqlFetcher<RegisterSocialMutation, RegisterSocialMutationVariables>(RegisterSocialDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

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