import React from 'react';
import { useIntl } from 'react-intl';

import PaginatedList from '@components/templates/paginatedList';
import { ENTRIES_PER_PAGE } from '@lib/constants';
import { useGetPlaylistsPageDataQuery } from '@lib/generated/graphql';
import getPageOffset from '@lib/getPageOffset';
import { PaginationData } from '@lib/getPaginatedStaticProps';
import getPaginationPageCount from '@lib/getPaginationPageCount';
import { makePlaylistDetailRoute, makePlaylistListRoute } from '@lib/routes';
import { useLanguageId } from '@lib/useLanguageId';
import { useQueryString } from '@lib/useQueryString';

// TODO: render loading screen
function Playlists(): JSX.Element {
	const language = useLanguageId();
	const page = useQueryString('i') || '';
	const { data } = useGetPlaylistsPageDataQuery({
		language,
		offset: getPageOffset(page),
		first: ENTRIES_PER_PAGE,
	});
	const playlists = data?.me?.user.playlists.nodes || [];
	const count = data?.me?.user.playlists.aggregate?.count || 0;
	const pagination: PaginationData = {
		total: getPaginationPageCount(count),
		current: +page,
	};
	const intl = useIntl();
	return (
		<PaginatedList
			pageTitle={intl.formatMessage({
				id: 'playlists__pageTitle',
				defaultMessage: 'Playlists',
				description: 'Playlists list page title',
			})}
			nodes={playlists}
			makePageRoute={makePlaylistListRoute}
			makeEntryRoute={(l, n) => makePlaylistDetailRoute(l, n.id)}
			pagination={pagination}
		/>
	);
}

export default Playlists;
