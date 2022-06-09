import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import SearchCollections, {
	SearchCollectionsProps,
} from '@containers/search/collections';
import { getSearchResultsCollections } from '@containers/search/collections.gql';
import { storeRequest } from '@lib/api/storeRequest';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SearchCollections;

export async function getServerSideProps({
	req,
	params,
	query,
}: GetServerSidePropsContext<{
	language: string;
	i: string;
}>): Promise<GetServerSidePropsResult<SearchCollectionsProps>> {
	storeRequest(req);

	const { props } = await getPaginatedStaticProps(
		params as { language: string; i: string },
		(variables) =>
			getSearchResultsCollections({
				...variables,
				term: query?.q as string,
			}),
		(d) => d.collections.nodes,
		(d) => d.collections.aggregate?.count
	);
	return {
		props,
	};
}
