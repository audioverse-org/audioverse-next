import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import Library, { ILibraryProps } from '@containers/library/library';
import { storeRequest } from '@lib/api/storeRequest';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default Library;

export function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
}>): GetServerSidePropsResult<ILibraryProps> {
	storeRequest(req);
	const language = getLanguageIdByRoute(params?.language);

	return {
		props: {
			language,
		},
	};
}
