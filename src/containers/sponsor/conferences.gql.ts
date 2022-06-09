// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { SponsorPivotFragmentDoc } from './pivot.gql';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSponsorConferencesPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	id: Types.Scalars['ID'];
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSponsorConferencesPageDataQuery = {
	__typename?: 'Query';
	sponsor?: {
		__typename?: 'Sponsor';
		id: string;
		title: string;
		canonicalPath: string;
		image?: { __typename?: 'Image'; url: any } | null;
	} | null;
	collections: {
		__typename?: 'CollectionConnection';
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
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
};

export type GetSponsorConferencesPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSponsorConferencesPathsDataQuery = {
	__typename?: 'Query';
	sponsors: {
		__typename?: 'SponsorConnection';
		nodes?: Array<{ __typename?: 'Sponsor'; id: string }> | null;
	};
};

export const GetSponsorConferencesPageDataDocument = `
    query getSponsorConferencesPageData($language: Language!, $id: ID!, $offset: Int, $first: Int) {
  sponsor(id: $id) {
    ...sponsorPivot
  }
  collections(
    language: $language
    sponsorId: $id
    offset: $offset
    first: $first
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
    }
    aggregate {
      count
    }
  }
}
    ${SponsorPivotFragmentDoc}
${CardCollectionFragmentDoc}`;
export const useGetSponsorConferencesPageDataQuery = <
	TData = GetSponsorConferencesPageDataQuery,
	TError = unknown
>(
	variables: GetSponsorConferencesPageDataQueryVariables,
	options?: UseQueryOptions<GetSponsorConferencesPageDataQuery, TError, TData>
) =>
	useQuery<GetSponsorConferencesPageDataQuery, TError, TData>(
		['getSponsorConferencesPageData', variables],
		graphqlFetcher<
			GetSponsorConferencesPageDataQuery,
			GetSponsorConferencesPageDataQueryVariables
		>(GetSponsorConferencesPageDataDocument, variables),
		options
	);
export const GetSponsorConferencesPathsDataDocument = `
    query getSponsorConferencesPathsData($language: Language!, $first: Int) {
  sponsors(language: $language, first: $first) {
    nodes {
      id
    }
  }
}
    `;
export const useGetSponsorConferencesPathsDataQuery = <
	TData = GetSponsorConferencesPathsDataQuery,
	TError = unknown
>(
	variables: GetSponsorConferencesPathsDataQueryVariables,
	options?: UseQueryOptions<GetSponsorConferencesPathsDataQuery, TError, TData>
) =>
	useQuery<GetSponsorConferencesPathsDataQuery, TError, TData>(
		['getSponsorConferencesPathsData', variables],
		graphqlFetcher<
			GetSponsorConferencesPathsDataQuery,
			GetSponsorConferencesPathsDataQueryVariables
		>(GetSponsorConferencesPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSponsorConferencesPageData<T>(
	variables: ExactAlt<T, GetSponsorConferencesPageDataQueryVariables>
): Promise<GetSponsorConferencesPageDataQuery> {
	return fetchApi(GetSponsorConferencesPageDataDocument, { variables });
}

export async function getSponsorConferencesPathsData<T>(
	variables: ExactAlt<T, GetSponsorConferencesPathsDataQueryVariables>
): Promise<GetSponsorConferencesPathsDataQuery> {
	return fetchApi(GetSponsorConferencesPathsDataDocument, { variables });
}
