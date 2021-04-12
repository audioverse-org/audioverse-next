import React from 'react';

import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { ENTRIES_PER_PAGE } from '@lib/constants';
import { useGetPlaylistPageDataQuery } from '@lib/generated/graphql';
import getPageOffset from '@lib/getPageOffset';
import getPaginationPageCount from '@lib/getPaginationPageCount';
import { makePlaylistDetailRoute } from '@lib/routes';
import { useQueryString } from '@lib/useQueryString';

// TODO: Should this page link to a custom RSS feed?
// TODO: Support reordering
// TODO: Support deleting 1
// TODO: Support deleting all
function Playlist(): JSX.Element {
	const id = useQueryString('id') || '';
	const page = useQueryString('i') || '';
	const { data } = useGetPlaylistPageDataQuery({
		id,
		offset: getPageOffset(page),
		first: ENTRIES_PER_PAGE,
	});
	const recordings = data?.me?.user.playlist?.recordings.nodes;
	const totalNodes = data?.me?.user.playlist?.recordings.aggregate?.count || 0;
	return (
		<>
			<h1>{data?.me?.user.playlist?.title}</h1>
			{recordings?.length && <RecordingList recordings={recordings} />}
			<Pagination
				makeRoute={(l, i) => makePlaylistDetailRoute(l, id, i)}
				current={+page}
				total={getPaginationPageCount(totalNodes)}
			/>
		</>
	);
}

export default Playlist;
