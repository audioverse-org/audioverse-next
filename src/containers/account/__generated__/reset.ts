import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type ResetPasswordMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', userReset: { __typename?: 'SuccessPayload', success: boolean, errors: Array<{ __typename?: 'InputValidationError', message: string }> } };


export const ResetPasswordDocument = `
    mutation resetPassword($token: String!, $password: String!) {
  userReset(password: $password, token: $token) {
    errors {
      message
    }
    success
  }
}
    `;
export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) =>
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      ['resetPassword'],
      (variables?: ResetPasswordMutationVariables) => graphqlFetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function resetPassword<T>(
	variables: ExactAlt<T, ResetPasswordMutationVariables>
): Promise<ResetPasswordMutation> {
	return fetchApi(ResetPasswordDocument, { variables });
}