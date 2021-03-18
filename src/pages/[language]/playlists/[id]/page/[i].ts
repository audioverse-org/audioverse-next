import Playlist from '@containers/playlist/detail';
import { storeRequest } from '@lib/api';
import { getPlaylistPageData } from '@lib/generated/graphql';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';
import { getPaginatedData } from '@lib/getPaginatedData';

export default Playlist;

interface Context {
	req: any;
	query: {
		language: string;
		id: string;
		i: string;
	};
}

export async function getServerSideProps({
	req,
	query,
}: Context): Promise<DehydratedProps> {
	storeRequest(req);
	return getDehydratedProps([
		[
			'getPlaylistPageData',
			() => getPaginatedData(query.i, getPlaylistPageData, { id: query.id }),
		],
	]);
}
