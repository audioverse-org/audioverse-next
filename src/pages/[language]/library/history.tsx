import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import LibraryHistory, {
	ILibraryHistoryProps,
} from '@containers/library/history';
import { storeRequest } from '@lib/api/storeRequest';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default LibraryHistory;

export function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
}>): GetServerSidePropsResult<ILibraryHistoryProps> {
	storeRequest(req);
	const language = getLanguageIdByRoute(params?.language);

	return {
		props: {
			language,
		},
	};
}
