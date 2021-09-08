import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import TableList from '@components/organisms/tableList';
import { GetSponsorSeriesPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import {
	makeSeriesDetailRoute,
	makeSponsorRoute,
	makeSponsorSeriesRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useQueryString } from '@lib/useQueryString';

export type SponsorSeriesProps = PaginatedProps<
	NonNullable<GetSponsorSeriesPageDataQuery['serieses']['nodes']>[0],
	GetSponsorSeriesPageDataQuery
>;

function SponsorSeries({
	data,
	nodes,
	pagination,
}: SponsorSeriesProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const id = useQueryString('id') || '';
	const imageSrc = data?.sponsor?.imageWithFallback.url;
	return (
		<>
			{imageSrc && (
				<Image
					src={imageSrc}
					alt={data?.sponsor?.title}
					width={100}
					height={100}
				/>
			)}
			<h1>
				<Link href={makeSponsorRoute(languageRoute, id)}>
					<a>{data?.sponsor?.title}</a>
				</Link>
			</h1>
			<h2>
				<FormattedMessage
					id={'sponsorSeriesPage__title'}
					defaultMessage={'Series'}
					description={'Sponsor series page title'}
				/>
			</h2>
			<TableList
				nodes={nodes}
				makeEntryRoute={(l, n) => makeSeriesDetailRoute(l, n.id)}
			/>
			<Pagination
				{...pagination}
				makeRoute={(l, i) => makeSponsorSeriesRoute(l, id, i)}
			/>
		</>
	);
}

export default withFailStates(SponsorSeries, ({ nodes }) => !nodes?.length);
