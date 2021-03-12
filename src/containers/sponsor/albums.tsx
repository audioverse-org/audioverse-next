import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import TableList from '@components/organisms/tableList';
import {
	makeAlbumRoute,
	makeSponsorAlbumsRoute,
	makeSponsorRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import useRouterQuery from '@lib/useRouterQuery';
import { SponsorSongsStaticProps } from '@pages/[language]/sponsors/[id]/albums/page/[i]';

type Props = SponsorSongsStaticProps['props'];

function SponsorAlbums({ nodes, pagination, data }: Props): JSX.Element {
	const { id = '' } = useRouterQuery();
	const languageRoute = useLanguageRoute();

	return (
		<>
			<h1>
				<a href={makeSponsorRoute(languageRoute, id.toString())}>
					{data?.sponsor?.title}
				</a>
			</h1>
			<h2>
				<FormattedMessage
					id={'sponsorAlbumsPage__title'}
					defaultMessage={'Albums'}
					description={'Sponsor albums page title'}
				/>
			</h2>
			<TableList
				nodes={nodes}
				makeEntryRoute={(l, n) => makeAlbumRoute(l, n.id)}
			/>
			<Pagination
				makeRoute={(l, i) => makeSponsorAlbumsRoute(l, id.toString(), i)}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(SponsorAlbums, ({ nodes }) => !nodes?.length);
