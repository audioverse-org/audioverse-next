import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import LibraryPlaylists, {
	ILibraryPlaylistsProps,
} from '@containers/library/playlist/list';
import { storeRequest } from '@lib/api/storeRequest';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default LibraryPlaylists;

export function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
}>): GetServerSidePropsResult<ILibraryPlaylistsProps> {
	storeRequest(req);
	const language = getLanguageIdByRoute(params?.language);

	return {
		props: {
			language,
		},
	};
}
