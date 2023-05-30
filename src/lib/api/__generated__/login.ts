import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions, QueryFunctionContext } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthenticatedUserPayload', authenticatedUser: { __typename?: 'AuthenticatedUser', sessionToken: string } | null, errors: Array<{ __typename?: 'InputValidationError', message: string }> } };


export const LoginDocument = `
    mutation login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    authenticatedUser {
      sessionToken
    }
    errors {
      message
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['login'],
      (variables?: LoginMutationVariables) => graphqlFetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function login<T>(
	variables: ExactAlt<T, LoginMutationVariables>
): Promise<LoginMutation> {
	return fetchApi(LoginDocument, { variables });
}