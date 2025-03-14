import { DehydratedState } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import LibraryPlaylistDetail from '~containers/library/playlist/libraryPlaylistDetail';
import { storeRequest } from '~lib/api/storeRequest';
import getDehydratedProps from '~src/lib/getDehydratedProps';
import { prefetchQueries } from '~src/lib/prefetchQueries';

export default LibraryPlaylistDetail;

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
	playlist: string;
}>): Promise<
	GetServerSidePropsResult<{
		dehydratedState: DehydratedState;
	}>
> {
	storeRequest(req);
	const client = await prefetchQueries({
		getLibraryPlaylistPageData: { id: params?.playlist.toString() as string },
	});

	return getDehydratedProps(client);
}
