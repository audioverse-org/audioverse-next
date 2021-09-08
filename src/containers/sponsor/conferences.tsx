import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import TableList from '@components/organisms/tableList';
import { GetSponsorConferencesPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import {
	makeCollectionRoute,
	makeSponsorConferencesRoute,
	makeSponsorRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useQueryString } from '@lib/useQueryString';

export type SponsorConferencesProps = PaginatedProps<
	NonNullable<GetSponsorConferencesPageDataQuery['conferences']['nodes']>[0],
	GetSponsorConferencesPageDataQuery
>;

function SponsorConferences({
	nodes,
	data,
	pagination,
}: SponsorConferencesProps): JSX.Element {
	const id = useQueryString('id') || '';
	const languageRoute = useLanguageRoute();
	return (
		<>
			<h1>
				<Link href={makeSponsorRoute(languageRoute, id)}>
					<a>{data?.sponsor?.title}</a>
				</Link>
			</h1>
			<h2>
				<FormattedMessage
					id={'sponsorConferencesPage__title'}
					defaultMessage={'Conferences'}
					description={'Sponsor conferences page title'}
				/>
			</h2>
			<TableList
				nodes={nodes}
				makeEntryRoute={(l, n) => makeCollectionRoute(l, n.id)}
			/>
			<Pagination
				makeRoute={(l, i) => makeSponsorConferencesRoute(l, id, i)}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(
	SponsorConferences,
	({ nodes }) => !nodes?.length
);
