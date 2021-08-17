import { GetServerSidePropsResult } from 'next';

import Discover from '@containers/discover';
import { storeRequest } from '@lib/api';
import {
	getDiscoverPageData,
	GetDiscoverPageDataQuery,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default Discover;

interface Context {
	req: any;
	query: {
		language: string;
	};
}

export async function getServerSideProps({ req, query }: Context): Promise<
	GetServerSidePropsResult<{
		data: GetDiscoverPageDataQuery;
	}>
> {
	storeRequest(req);

	const language = getLanguageIdByRoute(query.language);

	return {
		props: {
			data: await getDiscoverPageData({ language }),
		},
	};
}
