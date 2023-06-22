import * as Types from '../../__generated__/graphql';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type SubmitContactPageMutationVariables = Types.Exact<{
  language: Types.Language;
  recipient: Types.PageContactRecipient;
  firstName: Types.Scalars['String'];
  lastName: Types.Scalars['String'];
  email: Types.Scalars['String'];
  body: Types.Scalars['String'];
}>;


export type SubmitContactPageMutation = { __typename?: 'Mutation', pageContactSubmit: { __typename?: 'SuccessPayload', success: boolean } };


export const SubmitContactPageDocument = `
    mutation submitContactPage($language: Language!, $recipient: PageContactRecipient!, $firstName: String!, $lastName: String!, $email: String!, $body: String!) {
  pageContactSubmit(
    input: {language: $language, recipient: $recipient, givenName: $firstName, surname: $lastName, email: $email, body: $body}
  ) {
    success
  }
}
    `;
export const useSubmitContactPageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SubmitContactPageMutation, TError, SubmitContactPageMutationVariables, TContext>) =>
    useMutation<SubmitContactPageMutation, TError, SubmitContactPageMutationVariables, TContext>(
      ['submitContactPage'],
      (variables?: SubmitContactPageMutationVariables) => graphqlFetcher<SubmitContactPageMutation, SubmitContactPageMutationVariables>(SubmitContactPageDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function submitContactPage<T>(
	variables: ExactAlt<T, SubmitContactPageMutationVariables>
): Promise<SubmitContactPageMutation> {
	return fetchApi(SubmitContactPageDocument, { variables });
}