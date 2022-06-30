import * as Types from '../../../__generated__/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetBibleBookContentQueryVariables = Types.Exact<{
	bibleId: Types.Scalars['ID'];
	bookId: Types.Scalars['ID'];
}>;

export type GetBibleBookContentQuery = {
	__typename?: 'Query';
	audiobible: {
		__typename?: 'Bible';
		book: {
			__typename?: 'BibleBook';
			chapters: Array<{
				__typename?: 'BibleChapter';
				id: string | number;
				text: string;
			}>;
		};
	} | null;
};

export const GetBibleBookContentDocument = `
    query getBibleBookContent($bibleId: ID!, $bookId: ID!) {
  audiobible(id: $bibleId) {
    book(id: $bookId) {
      chapters {
        id
        text
      }
    }
  }
}
    `;
export const useGetBibleBookContentQuery = <
	TData = GetBibleBookContentQuery,
	TError = unknown
>(
	variables: GetBibleBookContentQueryVariables,
	options?: UseQueryOptions<GetBibleBookContentQuery, TError, TData>
) =>
	useQuery<GetBibleBookContentQuery, TError, TData>(
		['getBibleBookContent', variables],
		graphqlFetcher<GetBibleBookContentQuery, GetBibleBookContentQueryVariables>(
			GetBibleBookContentDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getBibleBookContent<T>(
	variables: ExactAlt<T, GetBibleBookContentQueryVariables>
): Promise<GetBibleBookContentQuery> {
	return fetchApi(GetBibleBookContentDocument, { variables });
}
