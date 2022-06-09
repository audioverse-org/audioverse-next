// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.gql';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.gql';
import { CardSponsorFragmentDoc } from '../../components/molecules/card/sponsor.gql';
import { CardPersonFragmentDoc } from '../../components/molecules/card/person.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSearchResultsPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	term: Types.Scalars['String'];
}>;

export type GetSearchResultsPageDataQuery = {
	__typename?: 'Query';
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		nodes?: Array<{
			__typename?: 'Recording';
			canonicalPath: string;
			sequenceIndex?: number | null;
			id: string;
			title: string;
			duration: number;
			recordingContentType: Types.RecordingContentType;
			sequence?: {
				__typename?: 'Sequence';
				id: string;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				title: string;
				image?: { __typename?: 'Image'; url: any } | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
				collection?: { __typename?: 'Collection'; title: string } | null;
			} | null;
			writers: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: any };
			}>;
			sponsor?: {
				__typename?: 'Sponsor';
				id: string;
				title: string;
				canonicalPath: string;
				image?: { __typename?: 'Image'; url: any } | null;
			} | null;
			persons: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: any };
			}>;
			collection?: { __typename?: 'Collection'; title: string } | null;
			audioFiles: Array<{
				__typename?: 'AudioFile';
				url: any;
				filesize: string;
				mimeType: string;
				duration: number;
			}>;
			videoFiles: Array<{
				__typename?: 'VideoFile';
				url: any;
				filesize: string;
				mimeType: string;
				duration: number;
			}>;
			videoStreams: Array<{
				__typename?: 'VideoFile';
				url: any;
				logUrl?: any | null;
				filesize: string;
				mimeType: string;
				duration: number;
			}>;
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	sequences: {
		__typename?: 'SequenceConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		nodes?: Array<{
			__typename?: 'Sequence';
			id: string;
			title: string;
			canonicalPath: string;
			contentType: Types.SequenceContentType;
			duration: number;
			summary: string;
			speakers: {
				__typename?: 'PersonConnection';
				nodes?: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: any };
				}> | null;
			};
			sequenceWriters: {
				__typename?: 'PersonConnection';
				nodes?: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: any };
				}> | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				nodes?: Array<{
					__typename?: 'Recording';
					canonicalPath: string;
				}> | null;
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection?: { __typename?: 'Collection'; title: string } | null;
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	collections: {
		__typename?: 'CollectionConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		nodes?: Array<{
			__typename?: 'Collection';
			id: string;
			canonicalPath: string;
			title: string;
			startDate?: any | null;
			endDate?: any | null;
			duration: number;
			collectionContentType: Types.CollectionContentType;
			image?: { __typename?: 'Image'; id: string; url: any } | null;
			allSequences: {
				__typename?: 'SequenceConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	sponsors: {
		__typename?: 'SponsorConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		nodes?: Array<{
			__typename?: 'Sponsor';
			id: string;
			title: string;
			canonicalPath: string;
			image?: { __typename?: 'Image'; url: any } | null;
			collections: {
				__typename?: 'CollectionConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			sequences: {
				__typename?: 'SequenceConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			recordings: {
				__typename?: 'RecordingConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	persons: {
		__typename?: 'PersonConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		nodes?: Array<{
			__typename?: 'Person';
			id: string;
			name: string;
			canonicalPath: string;
			image?: { __typename?: 'Image'; id: string; url: any } | null;
			recordings: {
				__typename?: 'RecordingConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
};

export const GetSearchResultsPageDataDocument = `
    query getSearchResultsPageData($language: Language!, $term: String!) {
  recordings(language: $language, search: $term, first: 6) {
    aggregate {
      count
    }
    nodes {
      ...cardRecording
    }
    pageInfo {
      hasNextPage
    }
  }
  sequences(language: $language, search: $term, first: 3) {
    aggregate {
      count
    }
    nodes {
      ...cardSequence
    }
    pageInfo {
      hasNextPage
    }
  }
  collections(language: $language, search: $term, first: 3) {
    aggregate {
      count
    }
    nodes {
      ...cardCollection
    }
    pageInfo {
      hasNextPage
    }
  }
  sponsors(language: $language, search: $term, first: 3) {
    aggregate {
      count
    }
    nodes {
      ...cardSponsor
    }
    pageInfo {
      hasNextPage
    }
  }
  persons(language: $language, search: $term, first: 3) {
    aggregate {
      count
    }
    nodes {
      ...cardPerson
    }
    pageInfo {
      hasNextPage
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${CardSequenceFragmentDoc}
${CardCollectionFragmentDoc}
${CardSponsorFragmentDoc}
${CardPersonFragmentDoc}`;
export const useGetSearchResultsPageDataQuery = <
	TData = GetSearchResultsPageDataQuery,
	TError = unknown
>(
	variables: GetSearchResultsPageDataQueryVariables,
	options?: UseQueryOptions<GetSearchResultsPageDataQuery, TError, TData>
) =>
	useQuery<GetSearchResultsPageDataQuery, TError, TData>(
		['getSearchResultsPageData', variables],
		graphqlFetcher<
			GetSearchResultsPageDataQuery,
			GetSearchResultsPageDataQueryVariables
		>(GetSearchResultsPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSearchResultsPageData<T>(
	variables: ExactAlt<T, GetSearchResultsPageDataQueryVariables>
): Promise<GetSearchResultsPageDataQuery> {
	return fetchApi(GetSearchResultsPageDataDocument, { variables });
}
