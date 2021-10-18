import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import LibraryCollections, {
	ILibraryCollectionsProps,
} from '@containers/library/collections';
import { storeRequest } from '@lib/api';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default LibraryCollections;

export function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
}>): GetServerSidePropsResult<ILibraryCollectionsProps> {
	storeRequest(req);
	const language = getLanguageIdByRoute(params?.language);

	return {
		props: {
			language,
		},
	};
}
