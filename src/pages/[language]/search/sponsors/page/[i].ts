import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import SearchSponsors, {
	SearchSponsorsProps,
} from '@containers/search/sponsors';
import { storeRequest } from '@lib/api/storeRequest';
import { getSearchResultsSponsors } from '@lib/generated/graphql';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SearchSponsors;

export async function getServerSideProps({
	req,
	params,
	query,
}: GetServerSidePropsContext<{
	language: string;
	i: string;
}>): Promise<GetServerSidePropsResult<SearchSponsorsProps>> {
	storeRequest(req);

	const { props } = await getPaginatedStaticProps(
		params as { language: string; i: string },
		(variables) =>
			getSearchResultsSponsors({
				...variables,
				term: query?.q as string,
			}),
		(d) => d.sponsors.nodes,
		(d) => d.sponsors.aggregate?.count
	);
	return {
		props,
	};
}
