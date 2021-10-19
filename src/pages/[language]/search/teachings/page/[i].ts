import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import SearchTeachings, {
	SearchTeachingsProps,
} from '@containers/search/teachings';
import { storeRequest } from '@lib/api';
import { getSearchResultsRecordings } from '@lib/generated/graphql';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SearchTeachings;

export async function getServerSideProps({
	req,
	params,
	query,
}: GetServerSidePropsContext<{
	language: string;
	i: string;
}>): Promise<GetServerSidePropsResult<SearchTeachingsProps>> {
	storeRequest(req);

	const { props } = await getPaginatedStaticProps(
		params as { language: string; i: string },
		(variables) =>
			getSearchResultsRecordings({
				...variables,
				term: query?.q as string,
			}),
		(d) => d.recordings.nodes,
		(d) => d.recordings.aggregate?.count
	);
	return {
		props,
	};
}
