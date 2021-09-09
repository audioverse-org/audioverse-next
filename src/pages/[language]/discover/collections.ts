import { GetServerSidePropsResult, GetStaticPropsContext } from 'next';

import DiscoverCollections from '@containers/discover/collections';
import { storeRequest } from '@lib/api';
import {
	getDiscoverCollectionsPageData,
	GetDiscoverCollectionsPageDataQuery,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default DiscoverCollections;

interface Context extends GetStaticPropsContext<{ language: string }> {
	req: any;
}

export async function getServerSideProps({ req, params }: Context): Promise<
	GetServerSidePropsResult<{
		data: GetDiscoverCollectionsPageDataQuery;
	}>
> {
	storeRequest(req);

	const language = getLanguageIdByRoute(params?.language);

	return {
		props: {
			data: await getDiscoverCollectionsPageData({ language }),
		},
	};
}
