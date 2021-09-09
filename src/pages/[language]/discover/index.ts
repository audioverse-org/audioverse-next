import { GetServerSidePropsResult, GetStaticPropsContext } from 'next';

import Discover from '@containers/discover';
import { storeRequest } from '@lib/api';
import {
	getDiscoverPageData,
	GetDiscoverPageDataQuery,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default Discover;

interface Context extends GetStaticPropsContext<{ language: string }> {
	req: any;
}

export async function getServerSideProps({ req, params }: Context): Promise<
	GetServerSidePropsResult<{
		data: GetDiscoverPageDataQuery;
	}>
> {
	storeRequest(req);

	const language = getLanguageIdByRoute(params?.language);

	return {
		props: {
			data: await getDiscoverPageData({ language }),
		},
	};
}
