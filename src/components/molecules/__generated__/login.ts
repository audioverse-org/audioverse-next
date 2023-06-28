import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type LoginForgotPasswordMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type LoginForgotPasswordMutation = { __typename?: 'Mutation', userRecover: { __typename?: 'SuccessPayload', success: boolean, errors: Array<{ __typename?: 'InputValidationError', message: string }> } };


export const LoginForgotPasswordDocument = `
    mutation loginForgotPassword($email: String!) {
  userRecover(email: $email) {
    errors {
      message
    }
    success
  }
}
    `;
export const useLoginForgotPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginForgotPasswordMutation, TError, LoginForgotPasswordMutationVariables, TContext>) =>
    useMutation<LoginForgotPasswordMutation, TError, LoginForgotPasswordMutationVariables, TContext>(
      ['loginForgotPassword'],
      (variables?: LoginForgotPasswordMutationVariables) => graphqlFetcher<LoginForgotPasswordMutation, LoginForgotPasswordMutationVariables>(LoginForgotPasswordDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function loginForgotPassword<T>(
	variables: ExactAlt<T, LoginForgotPasswordMutationVariables>
): Promise<LoginForgotPasswordMutation> {
	return fetchApi(LoginForgotPasswordDocument, { variables });
}