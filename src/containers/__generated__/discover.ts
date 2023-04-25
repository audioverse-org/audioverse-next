import * as Types from '../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../components/templates/__generated__/andMiniplayer';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/__generated__/sequence';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/__generated__/collection';
import { CardPostFragmentDoc } from '../../components/molecules/card/__generated__/post';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetDiscoverRecentTeachingsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetDiscoverRecentTeachingsQuery = { __typename?: 'Query', recentTeachings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } };

export type GetDiscoverTrendingTeachingsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetDiscoverTrendingTeachingsQuery = { __typename?: 'Query', trendingTeachings: { __typename?: 'PopularRecordingConnection', nodes: Array<{ __typename?: 'PopularRecording', recording: { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> } }> | null } };

export type GetDiscoverFeaturedTeachingsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetDiscoverFeaturedTeachingsQuery = { __typename?: 'Query', featuredTeachings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } };

export type GetDiscoverStorySeasonsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetDiscoverStorySeasonsQuery = { __typename?: 'Query', storySeasons: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null }, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null } };

export type GetDiscoverConferencesQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetDiscoverConferencesQuery = { __typename?: 'Query', conferences: { __typename?: 'CollectionConnection', nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null }, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null }, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null } };

export type GetDiscoverBlogPostsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetDiscoverBlogPostsQuery = { __typename?: 'Query', blogPosts: { __typename?: 'BlogPostConnection', nodes: Array<{ __typename?: 'BlogPost', publishDate: string, title: string, teaser: string, canonicalPath: string, readingDuration: number | null, image: { __typename?: 'Image', url: string } | null }> | null } };


export const GetDiscoverRecentTeachingsDocument = `
    query getDiscoverRecentTeachings($language: Language!, $first: Int!, $after: String) {
  recentTeachings: sermons(
    language: $language
    first: $first
    after: $after
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetDiscoverRecentTeachingsQuery = <
      TData = GetDiscoverRecentTeachingsQuery,
      TError = unknown
    >(
      variables: GetDiscoverRecentTeachingsQueryVariables,
      options?: UseQueryOptions<GetDiscoverRecentTeachingsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverRecentTeachingsQuery, TError, TData>(
      ['getDiscoverRecentTeachings', variables],
      graphqlFetcher<GetDiscoverRecentTeachingsQuery, GetDiscoverRecentTeachingsQueryVariables>(GetDiscoverRecentTeachingsDocument, variables),
      options
    );
export const GetDiscoverTrendingTeachingsDocument = `
    query getDiscoverTrendingTeachings($language: Language!, $first: Int!, $after: String) {
  trendingTeachings: popularRecordings(
    language: $language
    contentType: SERMON
    first: $first
    after: $after
  ) {
    nodes {
      recording {
        ...cardRecording
      }
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetDiscoverTrendingTeachingsQuery = <
      TData = GetDiscoverTrendingTeachingsQuery,
      TError = unknown
    >(
      variables: GetDiscoverTrendingTeachingsQueryVariables,
      options?: UseQueryOptions<GetDiscoverTrendingTeachingsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverTrendingTeachingsQuery, TError, TData>(
      ['getDiscoverTrendingTeachings', variables],
      graphqlFetcher<GetDiscoverTrendingTeachingsQuery, GetDiscoverTrendingTeachingsQueryVariables>(GetDiscoverTrendingTeachingsDocument, variables),
      options
    );
export const GetDiscoverFeaturedTeachingsDocument = `
    query getDiscoverFeaturedTeachings($language: Language!, $first: Int!, $after: String) {
  featuredTeachings: featuredRecordings(
    language: $language
    contentType: SERMON
    first: $first
    after: $after
  ) {
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetDiscoverFeaturedTeachingsQuery = <
      TData = GetDiscoverFeaturedTeachingsQuery,
      TError = unknown
    >(
      variables: GetDiscoverFeaturedTeachingsQueryVariables,
      options?: UseQueryOptions<GetDiscoverFeaturedTeachingsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverFeaturedTeachingsQuery, TError, TData>(
      ['getDiscoverFeaturedTeachings', variables],
      graphqlFetcher<GetDiscoverFeaturedTeachingsQuery, GetDiscoverFeaturedTeachingsQueryVariables>(GetDiscoverFeaturedTeachingsDocument, variables),
      options
    );
export const GetDiscoverStorySeasonsDocument = `
    query getDiscoverStorySeasons($language: Language!, $first: Int!, $after: String) {
  storySeasons(
    language: $language
    first: $first
    after: $after
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
      recordings(first: 2) {
        nodes {
          ...cardRecording
        }
      }
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetDiscoverStorySeasonsQuery = <
      TData = GetDiscoverStorySeasonsQuery,
      TError = unknown
    >(
      variables: GetDiscoverStorySeasonsQueryVariables,
      options?: UseQueryOptions<GetDiscoverStorySeasonsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverStorySeasonsQuery, TError, TData>(
      ['getDiscoverStorySeasons', variables],
      graphqlFetcher<GetDiscoverStorySeasonsQuery, GetDiscoverStorySeasonsQueryVariables>(GetDiscoverStorySeasonsDocument, variables),
      options
    );
export const GetDiscoverConferencesDocument = `
    query getDiscoverConferences($language: Language!, $first: Int!, $after: String) {
  conferences(
    language: $language
    first: $first
    after: $after
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
      sequences(first: 2, orderBy: [{field: RECORDING_COUNT, direction: DESC}]) {
        nodes {
          ...cardSequence
        }
      }
      recordings(
        first: 2
        sequenceId: 0
        orderBy: [{field: PUBLISHED_AT, direction: DESC}]
      ) {
        nodes {
          ...cardRecording
        }
      }
    }
  }
}
    ${CardCollectionFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetDiscoverConferencesQuery = <
      TData = GetDiscoverConferencesQuery,
      TError = unknown
    >(
      variables: GetDiscoverConferencesQueryVariables,
      options?: UseQueryOptions<GetDiscoverConferencesQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverConferencesQuery, TError, TData>(
      ['getDiscoverConferences', variables],
      graphqlFetcher<GetDiscoverConferencesQuery, GetDiscoverConferencesQueryVariables>(GetDiscoverConferencesDocument, variables),
      options
    );
export const GetDiscoverBlogPostsDocument = `
    query getDiscoverBlogPosts($language: Language!, $first: Int!, $after: String) {
  blogPosts(
    language: $language
    first: $first
    after: $after
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardPost
    }
  }
}
    ${CardPostFragmentDoc}`;
export const useGetDiscoverBlogPostsQuery = <
      TData = GetDiscoverBlogPostsQuery,
      TError = unknown
    >(
      variables: GetDiscoverBlogPostsQueryVariables,
      options?: UseQueryOptions<GetDiscoverBlogPostsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverBlogPostsQuery, TError, TData>(
      ['getDiscoverBlogPosts', variables],
      graphqlFetcher<GetDiscoverBlogPostsQuery, GetDiscoverBlogPostsQueryVariables>(GetDiscoverBlogPostsDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getDiscoverRecentTeachings<T>(
	variables: ExactAlt<T, GetDiscoverRecentTeachingsQueryVariables>
): Promise<GetDiscoverRecentTeachingsQuery> {
	return fetchApi(GetDiscoverRecentTeachingsDocument, { variables });
}

export async function getDiscoverTrendingTeachings<T>(
	variables: ExactAlt<T, GetDiscoverTrendingTeachingsQueryVariables>
): Promise<GetDiscoverTrendingTeachingsQuery> {
	return fetchApi(GetDiscoverTrendingTeachingsDocument, { variables });
}

export async function getDiscoverFeaturedTeachings<T>(
	variables: ExactAlt<T, GetDiscoverFeaturedTeachingsQueryVariables>
): Promise<GetDiscoverFeaturedTeachingsQuery> {
	return fetchApi(GetDiscoverFeaturedTeachingsDocument, { variables });
}

export async function getDiscoverStorySeasons<T>(
	variables: ExactAlt<T, GetDiscoverStorySeasonsQueryVariables>
): Promise<GetDiscoverStorySeasonsQuery> {
	return fetchApi(GetDiscoverStorySeasonsDocument, { variables });
}

export async function getDiscoverConferences<T>(
	variables: ExactAlt<T, GetDiscoverConferencesQueryVariables>
): Promise<GetDiscoverConferencesQuery> {
	return fetchApi(GetDiscoverConferencesDocument, { variables });
}

export async function getDiscoverBlogPosts<T>(
	variables: ExactAlt<T, GetDiscoverBlogPostsQueryVariables>
): Promise<GetDiscoverBlogPostsQuery> {
	return fetchApi(GetDiscoverBlogPostsDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getDiscoverRecentTeachings: ExactAlt<T, GetDiscoverRecentTeachingsQueryVariables>,
		getDiscoverTrendingTeachings: ExactAlt<T, GetDiscoverTrendingTeachingsQueryVariables>,
		getDiscoverFeaturedTeachings: ExactAlt<T, GetDiscoverFeaturedTeachingsQueryVariables>,
		getDiscoverStorySeasons: ExactAlt<T, GetDiscoverStorySeasonsQueryVariables>,
		getDiscoverConferences: ExactAlt<T, GetDiscoverConferencesQueryVariables>,
		getDiscoverBlogPosts: ExactAlt<T, GetDiscoverBlogPostsQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getDiscoverRecentTeachings', () => getDiscoverRecentTeachings(vars.getDiscoverRecentTeachings)],
		['getDiscoverTrendingTeachings', () => getDiscoverTrendingTeachings(vars.getDiscoverTrendingTeachings)],
		['getDiscoverFeaturedTeachings', () => getDiscoverFeaturedTeachings(vars.getDiscoverFeaturedTeachings)],
		['getDiscoverStorySeasons', () => getDiscoverStorySeasons(vars.getDiscoverStorySeasons)],
		['getDiscoverConferences', () => getDiscoverConferences(vars.getDiscoverConferences)],
		['getDiscoverBlogPosts', () => getDiscoverBlogPosts(vars.getDiscoverBlogPosts)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}