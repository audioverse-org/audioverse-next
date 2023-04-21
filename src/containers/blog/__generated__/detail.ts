import * as Types from '../../../__generated__/graphql';

import { CardPostFragmentDoc } from '../../../components/molecules/card/__generated__/post';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetBlogDetailDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  language: Types.Language;
}>;


export type GetBlogDetailDataQuery = { __typename?: 'Query', blogPost: { __typename?: 'BlogPost', id: string | number, title: string, body: string, canonicalPath: string, canonicalUrl: string, language: Types.Language, publishDate: string, readingDuration: number | null, teaser: string, image: { __typename?: 'Image', url: string } | null } | null, blogPosts: { __typename?: 'BlogPostConnection', nodes: Array<{ __typename?: 'BlogPost', publishDate: string, title: string, teaser: string, canonicalPath: string, readingDuration: number | null, image: { __typename?: 'Image', url: string } | null }> | null } };

export type GetBlogDetailStaticPathsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetBlogDetailStaticPathsQuery = { __typename?: 'Query', blogPosts: { __typename?: 'BlogPostConnection', nodes: Array<{ __typename?: 'BlogPost', canonicalPath: string }> | null } };


export const GetBlogDetailDataDocument = `
    query getBlogDetailData($id: ID!, $language: Language!) {
  blogPost(id: $id) {
    id
    title
    image {
      url(size: 2100, cropMode: MAX_SIZE)
    }
    body
    canonicalPath(useFuturePath: true)
    canonicalUrl(useFuturePath: true)
    language
    publishDate
    readingDuration
    teaser
  }
  blogPosts(
    language: $language
    first: 5
    orderBy: [{field: PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardPost
    }
  }
}
    ${CardPostFragmentDoc}`;
export const useGetBlogDetailDataQuery = <
      TData = GetBlogDetailDataQuery,
      TError = unknown
    >(
      variables: GetBlogDetailDataQueryVariables,
      options?: UseQueryOptions<GetBlogDetailDataQuery, TError, TData>
    ) =>
    useQuery<GetBlogDetailDataQuery, TError, TData>(
      ['getBlogDetailData', variables],
      graphqlFetcher<GetBlogDetailDataQuery, GetBlogDetailDataQueryVariables>(GetBlogDetailDataDocument, variables),
      options
    );
export const GetBlogDetailStaticPathsDocument = `
    query getBlogDetailStaticPaths($language: Language!, $first: Int) {
  blogPosts(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetBlogDetailStaticPathsQuery = <
      TData = GetBlogDetailStaticPathsQuery,
      TError = unknown
    >(
      variables: GetBlogDetailStaticPathsQueryVariables,
      options?: UseQueryOptions<GetBlogDetailStaticPathsQuery, TError, TData>
    ) =>
    useQuery<GetBlogDetailStaticPathsQuery, TError, TData>(
      ['getBlogDetailStaticPaths', variables],
      graphqlFetcher<GetBlogDetailStaticPathsQuery, GetBlogDetailStaticPathsQueryVariables>(GetBlogDetailStaticPathsDocument, variables),
      options
    );
import { fetchApi } from '@lib/api/fetchApi' 

export async function getBlogDetailData<T>(
	variables: ExactAlt<T, GetBlogDetailDataQueryVariables>
): Promise<GetBlogDetailDataQuery> {
	return fetchApi(GetBlogDetailDataDocument, { variables });
}

export async function getBlogDetailStaticPaths<T>(
	variables: ExactAlt<T, GetBlogDetailStaticPathsQueryVariables>
): Promise<GetBlogDetailStaticPathsQuery> {
	return fetchApi(GetBlogDetailStaticPathsDocument, { variables });
}