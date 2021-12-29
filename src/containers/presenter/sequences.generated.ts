import * as Types from '../../lib/generated/graphql';

import { PresenterPivotFragmentDoc } from './pivot.generated';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetPresenterSequencesPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	id: Types.Scalars['ID'];
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetPresenterSequencesPageDataQuery = {
	__typename?: 'Query';
	person:
		| {
				__typename?: 'Person';
				id: string | number;
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
		  }
		| null
		| undefined;
	sequences: {
		__typename?: 'SequenceConnection';
		nodes:
			| Array<{
					__typename?: 'Sequence';
					id: string | number;
					title: string;
					canonicalPath: string;
					contentType: Types.SequenceContentType;
					duration: number;
					summary: string;
					speakers: {
						__typename?: 'PersonConnection';
						nodes:
							| Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
							  }>
							| null
							| undefined;
					};
					sequenceWriters: {
						__typename?: 'PersonConnection';
						nodes:
							| Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
							  }>
							| null
							| undefined;
					};
					allRecordings: {
						__typename?: 'RecordingConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
					};
			  }>
			| null
			| undefined;
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const GetPresenterSequencesPageDataDocument = `
    query getPresenterSequencesPageData($language: Language!, $id: ID!, $offset: Int, $first: Int) {
  person(id: $id) {
    id
    ...presenterPivot
  }
  sequences(
    language: $language
    offset: $offset
    first: $first
    persons: [{personId: $id, role: SPEAKER}]
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
    aggregate {
      count
    }
  }
}
    ${PresenterPivotFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetPresenterSequencesPageDataQuery = <
	TData = GetPresenterSequencesPageDataQuery,
	TError = unknown
>(
	variables: GetPresenterSequencesPageDataQueryVariables,
	options?: UseQueryOptions<GetPresenterSequencesPageDataQuery, TError, TData>
) =>
	useQuery<GetPresenterSequencesPageDataQuery, TError, TData>(
		['getPresenterSequencesPageData', variables],
		graphqlFetcher<
			GetPresenterSequencesPageDataQuery,
			GetPresenterSequencesPageDataQueryVariables
		>(GetPresenterSequencesPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetPresenterSequencesPageDataDocument = `query getPresenterSequencesPageData($language:Language!$id:ID!$offset:Int$first:Int){person(id:$id){id ...presenterPivot}sequences(language:$language offset:$offset first:$first persons:[{personId:$id role:SPEAKER}]orderBy:[{field:RECORDING_PUBLISHED_AT direction:DESC}]){nodes{...cardSequence}aggregate{count}}}`;
export async function getPresenterSequencesPageData<T>(
	variables: ExactAlt<T, GetPresenterSequencesPageDataQueryVariables>
): Promise<GetPresenterSequencesPageDataQuery> {
	return fetchApi(GetPresenterSequencesPageDataDocument, { variables });
}
