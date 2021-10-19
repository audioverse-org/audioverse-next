import { GetServerSidePropsContext } from 'next';

import Library, { getLibraryDataDefaultVariables } from '@containers/library';
import { storeRequest } from '@lib/api';
import { getLibraryData } from '@lib/generated/graphql';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default Library;

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
				() => getLibraryData(getLibraryDataDefaultVariables(language)),
			],
		],
		{
			language,
		}
	);
}
