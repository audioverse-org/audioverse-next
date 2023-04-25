import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../templates/__generated__/andMiniplayer';
import { CardSequenceFragmentDoc } from '../../molecules/card/__generated__/sequence';
import { CardCollectionFragmentDoc } from '../../molecules/card/__generated__/collection';
import { CardSponsorFragmentDoc } from '../../molecules/card/__generated__/sponsor';
import { CardPersonFragmentDoc } from '../../molecules/card/__generated__/person';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSearchRecordingsQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSearchRecordingsQuery = { __typename?: 'Query', sermons: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };

export type GetSearchSeriesQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSearchSeriesQuery = { __typename?: 'Query', serieses: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };

export type GetSearchConferencesQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSearchConferencesQuery = { __typename?: 'Query', conferences: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };

export type GetSearchSponsorsQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSearchSponsorsQuery = { __typename?: 'Query', sponsors: { __typename?: 'SponsorConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null, collections: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, sequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };

export type GetSearchPersonsQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSearchPersonsQuery = { __typename?: 'Query', persons: { __typename?: 'PersonConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };

export type GetSearchAudiobooksQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSearchAudiobooksQuery = { __typename?: 'Query', audiobooks: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };

export type GetSearchMusicTracksQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSearchMusicTracksQuery = { __typename?: 'Query', musicTracks: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };

export type GetSearchStoryProgramsQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSearchStoryProgramsQuery = { __typename?: 'Query', storyPrograms: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSearchRecordingsDocument = `
    query getSearchRecordings($language: Language!, $term: String!, $first: Int!, $after: String) {
  sermons(language: $language, search: $term, first: $first, after: $after) {
    aggregate {
      count
    }
    nodes {
      ...cardRecording
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSearchRecordingsQuery = <
      TData = GetSearchRecordingsQuery,
      TError = unknown
    >(
      variables: GetSearchRecordingsQueryVariables,
      options?: UseQueryOptions<GetSearchRecordingsQuery, TError, TData>
    ) =>
    useQuery<GetSearchRecordingsQuery, TError, TData>(
      ['getSearchRecordings', variables],
      graphqlFetcher<GetSearchRecordingsQuery, GetSearchRecordingsQueryVariables>(GetSearchRecordingsDocument, variables),
      options
    );
export const GetSearchSeriesDocument = `
    query getSearchSeries($language: Language!, $term: String!, $first: Int!, $after: String) {
  serieses(language: $language, search: $term, first: $first, after: $after) {
    aggregate {
      count
    }
    nodes {
      ...cardSequence
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetSearchSeriesQuery = <
      TData = GetSearchSeriesQuery,
      TError = unknown
    >(
      variables: GetSearchSeriesQueryVariables,
      options?: UseQueryOptions<GetSearchSeriesQuery, TError, TData>
    ) =>
    useQuery<GetSearchSeriesQuery, TError, TData>(
      ['getSearchSeries', variables],
      graphqlFetcher<GetSearchSeriesQuery, GetSearchSeriesQueryVariables>(GetSearchSeriesDocument, variables),
      options
    );
export const GetSearchConferencesDocument = `
    query getSearchConferences($language: Language!, $term: String!, $first: Int!, $after: String) {
  conferences(language: $language, search: $term, first: $first, after: $after) {
    aggregate {
      count
    }
    nodes {
      ...cardCollection
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardCollectionFragmentDoc}`;
export const useGetSearchConferencesQuery = <
      TData = GetSearchConferencesQuery,
      TError = unknown
    >(
      variables: GetSearchConferencesQueryVariables,
      options?: UseQueryOptions<GetSearchConferencesQuery, TError, TData>
    ) =>
    useQuery<GetSearchConferencesQuery, TError, TData>(
      ['getSearchConferences', variables],
      graphqlFetcher<GetSearchConferencesQuery, GetSearchConferencesQueryVariables>(GetSearchConferencesDocument, variables),
      options
    );
export const GetSearchSponsorsDocument = `
    query getSearchSponsors($language: Language!, $term: String!, $first: Int!, $after: String) {
  sponsors(language: $language, search: $term, first: $first, after: $after) {
    aggregate {
      count
    }
    nodes {
      ...cardSponsor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardSponsorFragmentDoc}`;
export const useGetSearchSponsorsQuery = <
      TData = GetSearchSponsorsQuery,
      TError = unknown
    >(
      variables: GetSearchSponsorsQueryVariables,
      options?: UseQueryOptions<GetSearchSponsorsQuery, TError, TData>
    ) =>
    useQuery<GetSearchSponsorsQuery, TError, TData>(
      ['getSearchSponsors', variables],
      graphqlFetcher<GetSearchSponsorsQuery, GetSearchSponsorsQueryVariables>(GetSearchSponsorsDocument, variables),
      options
    );
export const GetSearchPersonsDocument = `
    query getSearchPersons($language: Language!, $term: String!, $first: Int!, $after: String) {
  persons(language: $language, search: $term, first: $first, after: $after) {
    aggregate {
      count
    }
    nodes {
      ...cardPerson
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardPersonFragmentDoc}`;
export const useGetSearchPersonsQuery = <
      TData = GetSearchPersonsQuery,
      TError = unknown
    >(
      variables: GetSearchPersonsQueryVariables,
      options?: UseQueryOptions<GetSearchPersonsQuery, TError, TData>
    ) =>
    useQuery<GetSearchPersonsQuery, TError, TData>(
      ['getSearchPersons', variables],
      graphqlFetcher<GetSearchPersonsQuery, GetSearchPersonsQueryVariables>(GetSearchPersonsDocument, variables),
      options
    );
export const GetSearchAudiobooksDocument = `
    query getSearchAudiobooks($language: Language!, $term: String!, $first: Int!, $after: String) {
  audiobooks(language: $language, search: $term, first: $first, after: $after) {
    aggregate {
      count
    }
    nodes {
      ...cardSequence
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetSearchAudiobooksQuery = <
      TData = GetSearchAudiobooksQuery,
      TError = unknown
    >(
      variables: GetSearchAudiobooksQueryVariables,
      options?: UseQueryOptions<GetSearchAudiobooksQuery, TError, TData>
    ) =>
    useQuery<GetSearchAudiobooksQuery, TError, TData>(
      ['getSearchAudiobooks', variables],
      graphqlFetcher<GetSearchAudiobooksQuery, GetSearchAudiobooksQueryVariables>(GetSearchAudiobooksDocument, variables),
      options
    );
export const GetSearchMusicTracksDocument = `
    query getSearchMusicTracks($language: Language!, $term: String!, $first: Int!, $after: String) {
  musicTracks(language: $language, search: $term, first: $first, after: $after) {
    aggregate {
      count
    }
    nodes {
      ...cardRecording
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSearchMusicTracksQuery = <
      TData = GetSearchMusicTracksQuery,
      TError = unknown
    >(
      variables: GetSearchMusicTracksQueryVariables,
      options?: UseQueryOptions<GetSearchMusicTracksQuery, TError, TData>
    ) =>
    useQuery<GetSearchMusicTracksQuery, TError, TData>(
      ['getSearchMusicTracks', variables],
      graphqlFetcher<GetSearchMusicTracksQuery, GetSearchMusicTracksQueryVariables>(GetSearchMusicTracksDocument, variables),
      options
    );
export const GetSearchStoryProgramsDocument = `
    query getSearchStoryPrograms($language: Language!, $term: String!, $first: Int!, $after: String) {
  storyPrograms(language: $language, search: $term, first: $first, after: $after) {
    aggregate {
      count
    }
    nodes {
      ...cardCollection
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardCollectionFragmentDoc}`;
export const useGetSearchStoryProgramsQuery = <
      TData = GetSearchStoryProgramsQuery,
      TError = unknown
    >(
      variables: GetSearchStoryProgramsQueryVariables,
      options?: UseQueryOptions<GetSearchStoryProgramsQuery, TError, TData>
    ) =>
    useQuery<GetSearchStoryProgramsQuery, TError, TData>(
      ['getSearchStoryPrograms', variables],
      graphqlFetcher<GetSearchStoryProgramsQuery, GetSearchStoryProgramsQueryVariables>(GetSearchStoryProgramsDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getSearchRecordings<T>(
	variables: ExactAlt<T, GetSearchRecordingsQueryVariables>
): Promise<GetSearchRecordingsQuery> {
	return fetchApi(GetSearchRecordingsDocument, { variables });
}

export async function getSearchSeries<T>(
	variables: ExactAlt<T, GetSearchSeriesQueryVariables>
): Promise<GetSearchSeriesQuery> {
	return fetchApi(GetSearchSeriesDocument, { variables });
}

export async function getSearchConferences<T>(
	variables: ExactAlt<T, GetSearchConferencesQueryVariables>
): Promise<GetSearchConferencesQuery> {
	return fetchApi(GetSearchConferencesDocument, { variables });
}

export async function getSearchSponsors<T>(
	variables: ExactAlt<T, GetSearchSponsorsQueryVariables>
): Promise<GetSearchSponsorsQuery> {
	return fetchApi(GetSearchSponsorsDocument, { variables });
}

export async function getSearchPersons<T>(
	variables: ExactAlt<T, GetSearchPersonsQueryVariables>
): Promise<GetSearchPersonsQuery> {
	return fetchApi(GetSearchPersonsDocument, { variables });
}

export async function getSearchAudiobooks<T>(
	variables: ExactAlt<T, GetSearchAudiobooksQueryVariables>
): Promise<GetSearchAudiobooksQuery> {
	return fetchApi(GetSearchAudiobooksDocument, { variables });
}

export async function getSearchMusicTracks<T>(
	variables: ExactAlt<T, GetSearchMusicTracksQueryVariables>
): Promise<GetSearchMusicTracksQuery> {
	return fetchApi(GetSearchMusicTracksDocument, { variables });
}

export async function getSearchStoryPrograms<T>(
	variables: ExactAlt<T, GetSearchStoryProgramsQueryVariables>
): Promise<GetSearchStoryProgramsQuery> {
	return fetchApi(GetSearchStoryProgramsDocument, { variables });
}