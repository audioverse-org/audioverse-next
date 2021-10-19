import { GetServerSidePropsContext } from 'next';

import LibraryHistory, {
	getLibraryHistoryPageDataDefaultVariables,
} from '@containers/library/history';
import { storeRequest } from '@lib/api';
import { getLibraryHistoryPageData } from '@lib/generated/graphql';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default LibraryHistory;

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{ language: string }>): Promise<DehydratedProps> {
	storeRequest(req);
	const language = getLanguageIdByRoute(params?.language);

	return getDehydratedProps(
		[
			[
				'getLibraryData',
				() =>
					getLibraryHistoryPageData(
						getLibraryHistoryPageDataDefaultVariables(language)
					),
			],
		],
		{
			language,
		}
	);
}
