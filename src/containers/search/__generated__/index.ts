import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { CardCollectionFragmentDoc } from '../../../components/molecules/card/__generated__/collection';
import { CardSponsorFragmentDoc } from '../../../components/molecules/card/__generated__/sponsor';
import { CardPersonFragmentDoc } from '../../../components/molecules/card/__generated__/person';
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
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
		nodes: Array<{
			__typename?: 'Recording';
			canonicalPath: string;
			sequenceIndex: number | null;
			id: string | number;
			title: string;
			duration: number;
			recordingContentType: Types.RecordingContentType;
			sequence: {
				__typename?: 'Sequence';
				id: string | number;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				title: string;
				image: { __typename?: 'Image'; url: string } | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
				collection: { __typename?: 'Collection'; title: string } | null;
			} | null;
			writers: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
			}>;
			sponsor: {
				__typename?: 'Sponsor';
				id: string | number;
				title: string;
				canonicalPath: string;
				image: { __typename?: 'Image'; url: string } | null;
			} | null;
			persons: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
			}>;
			collection: { __typename?: 'Collection'; title: string } | null;
			audioFiles: Array<{
				__typename?: 'AudioFile';
				url: string;
				filesize: string;
				mimeType: string;
				duration: number;
			}>;
			videoFiles: Array<{
				__typename?: 'VideoFile';
				url: string;
				filesize: string;
				mimeType: string;
				duration: number;
			}>;
			videoStreams: Array<{
				__typename?: 'VideoFile';
				url: string;
				logUrl: string | null;
				filesize: string;
				mimeType: string;
				duration: number;
			}>;
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	sequences: {
		__typename?: 'SequenceConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
		nodes: Array<{
			__typename?: 'Sequence';
			id: string | number;
			title: string;
			canonicalPath: string;
			contentType: Types.SequenceContentType;
			duration: number;
			summary: string;
			speakers: {
				__typename?: 'PersonConnection';
				nodes: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
				}> | null;
			};
			sequenceWriters: {
				__typename?: 'PersonConnection';
				nodes: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
				}> | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				nodes: Array<{
					__typename?: 'Recording';
					canonicalPath: string;
				}> | null;
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection: { __typename?: 'Collection'; title: string } | null;
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	collections: {
		__typename?: 'CollectionConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
		nodes: Array<{
			__typename?: 'Collection';
			id: string | number;
			canonicalPath: string;
			title: string;
			startDate: string | null;
			endDate: string | null;
			duration: number;
			collectionContentType: Types.CollectionContentType;
			image: { __typename?: 'Image'; id: string | number; url: string } | null;
			allSequences: {
				__typename?: 'SequenceConnection';
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	sponsors: {
		__typename?: 'SponsorConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
		nodes: Array<{
			__typename?: 'Sponsor';
			id: string | number;
			title: string;
			canonicalPath: string;
			image: { __typename?: 'Image'; url: string } | null;
			collections: {
				__typename?: 'CollectionConnection';
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
			sequences: {
				__typename?: 'SequenceConnection';
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
			recordings: {
				__typename?: 'RecordingConnection';
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	persons: {
		__typename?: 'PersonConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
		nodes: Array<{
			__typename?: 'Person';
			id: string | number;
			name: string;
			canonicalPath: string;
			image: { __typename?: 'Image'; id: string | number; url: string } | null;
			recordings: {
				__typename?: 'RecordingConnection';
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
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
