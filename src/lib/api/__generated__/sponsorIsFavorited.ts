import * as Types from '../../../__generated__/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type SponsorIsFavoritedQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type SponsorIsFavoritedQuery = {
	__typename?: 'Query';
	sponsor: { __typename?: 'Sponsor'; viewerHasFavorited: boolean } | null;
};

export const SponsorIsFavoritedDocument = `
    query sponsorIsFavorited($id: ID!) {
  sponsor(id: $id) {
    viewerHasFavorited
  }
}
    `;
export const useSponsorIsFavoritedQuery = <
	TData = SponsorIsFavoritedQuery,
	TError = unknown
>(
	variables: SponsorIsFavoritedQueryVariables,
	options?: UseQueryOptions<SponsorIsFavoritedQuery, TError, TData>
) =>
	useQuery<SponsorIsFavoritedQuery, TError, TData>(
		['sponsorIsFavorited', variables],
		graphqlFetcher<SponsorIsFavoritedQuery, SponsorIsFavoritedQueryVariables>(
			SponsorIsFavoritedDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function sponsorIsFavorited<T>(
	variables: ExactAlt<T, SponsorIsFavoritedQueryVariables>
): Promise<SponsorIsFavoritedQuery> {
	return fetchApi(SponsorIsFavoritedDocument, { variables });
}
