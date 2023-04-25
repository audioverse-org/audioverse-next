import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSearchResultsRecordings } from '~containers/search/__generated__/teachings';
import SearchTeachings, {
	SearchTeachingsProps,
} from '~containers/search/teachings';
import { storeRequest } from '~lib/api/storeRequest';
import { getPaginatedStaticProps } from '~lib/getPaginatedStaticProps';

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
