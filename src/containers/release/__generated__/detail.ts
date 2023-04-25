import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetMediaReleaseFormsPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetMediaReleaseFormsPageDataQuery = { __typename?: 'Query', mediaReleaseForm: { __typename?: 'MediaReleaseForm', id: string | number, title: string, summary: string, isClosed: boolean } | null };

export type GetMediaReleaseFormsPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
}>;


export type GetMediaReleaseFormsPathsDataQuery = { __typename?: 'Query', mediaReleaseForms: { __typename?: 'MediaReleaseFormConnection', nodes: Array<{ __typename?: 'MediaReleaseForm', id: string | number }> | null } };

export type SubmitMediaReleaseFormMutationVariables = Types.Exact<{
  mediaReleaseFormId: Types.Scalars['ID'];
  mediaReleasePerson: Types.MediaReleasePersonCreateInput;
  comments: Types.Scalars['String'];
}>;


export type SubmitMediaReleaseFormMutation = { __typename?: 'Mutation', mediaReleaseCreate: { __typename?: 'MediaReleasePayload', errors: Array<{ __typename?: 'InputValidationError', message: string }>, mediaRelease: { __typename?: 'MediaRelease', id: string | number } | null } };


export const GetMediaReleaseFormsPageDataDocument = `
    query getMediaReleaseFormsPageData($id: ID!) {
  mediaReleaseForm(id: $id) {
    id
    title
    summary
    isClosed
  }
}
    `;
export const useGetMediaReleaseFormsPageDataQuery = <
      TData = GetMediaReleaseFormsPageDataQuery,
      TError = unknown
    >(
      variables: GetMediaReleaseFormsPageDataQueryVariables,
      options?: UseQueryOptions<GetMediaReleaseFormsPageDataQuery, TError, TData>
    ) =>
    useQuery<GetMediaReleaseFormsPageDataQuery, TError, TData>(
      ['getMediaReleaseFormsPageData', variables],
      graphqlFetcher<GetMediaReleaseFormsPageDataQuery, GetMediaReleaseFormsPageDataQueryVariables>(GetMediaReleaseFormsPageDataDocument, variables),
      options
    );
export const useInfiniteGetMediaReleaseFormsPageDataQuery = <
      TData = GetMediaReleaseFormsPageDataQuery,
      TError = unknown
    >(
      variables: GetMediaReleaseFormsPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetMediaReleaseFormsPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetMediaReleaseFormsPageDataQuery, TError, TData>(
      ['getMediaReleaseFormsPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetMediaReleaseFormsPageDataQuery, GetMediaReleaseFormsPageDataQueryVariables>(GetMediaReleaseFormsPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetMediaReleaseFormsPathsDataDocument = `
    query getMediaReleaseFormsPathsData($language: Language!, $first: Int!) {
  mediaReleaseForms(language: $language, first: $first) {
    nodes {
      id
    }
  }
}
    `;
export const useGetMediaReleaseFormsPathsDataQuery = <
      TData = GetMediaReleaseFormsPathsDataQuery,
      TError = unknown
    >(
      variables: GetMediaReleaseFormsPathsDataQueryVariables,
      options?: UseQueryOptions<GetMediaReleaseFormsPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetMediaReleaseFormsPathsDataQuery, TError, TData>(
      ['getMediaReleaseFormsPathsData', variables],
      graphqlFetcher<GetMediaReleaseFormsPathsDataQuery, GetMediaReleaseFormsPathsDataQueryVariables>(GetMediaReleaseFormsPathsDataDocument, variables),
      options
    );
export const useInfiniteGetMediaReleaseFormsPathsDataQuery = <
      TData = GetMediaReleaseFormsPathsDataQuery,
      TError = unknown
    >(
      variables: GetMediaReleaseFormsPathsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetMediaReleaseFormsPathsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetMediaReleaseFormsPathsDataQuery, TError, TData>(
      ['getMediaReleaseFormsPathsData.infinite', variables],
      (metaData) => graphqlFetcher<GetMediaReleaseFormsPathsDataQuery, GetMediaReleaseFormsPathsDataQueryVariables>(GetMediaReleaseFormsPathsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const SubmitMediaReleaseFormDocument = `
    mutation submitMediaReleaseForm($mediaReleaseFormId: ID!, $mediaReleasePerson: MediaReleasePersonCreateInput!, $comments: String!) {
  mediaReleaseCreate(
    input: {mediaReleaseFormId: $mediaReleaseFormId, mediaReleasePerson: $mediaReleasePerson, notes: $comments}
  ) {
    errors {
      message
    }
    mediaRelease {
      id
    }
  }
}
    `;
export const useSubmitMediaReleaseFormMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SubmitMediaReleaseFormMutation, TError, SubmitMediaReleaseFormMutationVariables, TContext>) =>
    useMutation<SubmitMediaReleaseFormMutation, TError, SubmitMediaReleaseFormMutationVariables, TContext>(
      ['submitMediaReleaseForm'],
      (variables?: SubmitMediaReleaseFormMutationVariables) => graphqlFetcher<SubmitMediaReleaseFormMutation, SubmitMediaReleaseFormMutationVariables>(SubmitMediaReleaseFormDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getMediaReleaseFormsPageData<T>(
	variables: ExactAlt<T, GetMediaReleaseFormsPageDataQueryVariables>
): Promise<GetMediaReleaseFormsPageDataQuery> {
	return fetchApi(GetMediaReleaseFormsPageDataDocument, { variables });
}

export async function getMediaReleaseFormsPathsData<T>(
	variables: ExactAlt<T, GetMediaReleaseFormsPathsDataQueryVariables>
): Promise<GetMediaReleaseFormsPathsDataQuery> {
	return fetchApi(GetMediaReleaseFormsPathsDataDocument, { variables });
}

export async function submitMediaReleaseForm<T>(
	variables: ExactAlt<T, SubmitMediaReleaseFormMutationVariables>
): Promise<SubmitMediaReleaseFormMutation> {
	return fetchApi(SubmitMediaReleaseFormDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getMediaReleaseFormsPageData: ExactAlt<T, GetMediaReleaseFormsPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getMediaReleaseFormsPageData', () => getMediaReleaseFormsPageData(vars.getMediaReleaseFormsPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}