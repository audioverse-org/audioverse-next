import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import TableList from '@components/organisms/tableList';
import { GetSponsorAlbumsPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorAlbumsRoute } from '@lib/routes';
import { useQueryString } from '@lib/useQueryString';

export type SponsorAlbumsProps = PaginatedProps<
	NonNullable<GetSponsorAlbumsPageDataQuery['musicAlbums']['nodes']>[0],
	GetSponsorAlbumsPageDataQuery
>;

function SponsorAlbums({
	nodes,
	pagination,
	data,
}: SponsorAlbumsProps): JSX.Element {
	const id = useQueryString('id') || '';

	return (
		<>
			<h1>
				<Link href={data?.sponsor?.canonicalPath as string}>
					<a>{data?.sponsor?.title}</a>
				</Link>
			</h1>
			<h2>
				<FormattedMessage
					id="sponsorAlbumsPage__title"
					defaultMessage="Albums"
					description="Sponsor albums page title"
				/>
			</h2>
			<TableList nodes={nodes} makeEntryRoute={(l, n) => n.canonicalPath} />
			<Pagination
				makeRoute={(l, i) => makeSponsorAlbumsRoute(l, id, i)}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(SponsorAlbums, ({ nodes }) => !nodes?.length);
