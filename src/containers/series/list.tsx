import React from 'react';
import { useIntl } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import PaginatedList from '@components/templates/paginatedList';
import { GetSeriesListPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSeriesDetailRoute, makeSeriesListRoute } from '@lib/routes';

export type SeriesListProps = PaginatedProps<
	NonNullable<GetSeriesListPageDataQuery['serieses']['nodes']>[0],
	GetSeriesListPageDataQuery
>;

function SeriesList({ nodes, pagination }: SeriesListProps): JSX.Element {
	const intl = useIntl();
	return (
		<>
			<PaginatedList
				pageTitle={intl.formatMessage({
					id: 'seriesList__pageTitle',
					defaultMessage: 'Series',
					description: 'Series list page title',
				})}
				nodes={nodes}
				makePageRoute={makeSeriesListRoute}
				makeEntryRoute={(l, n) => makeSeriesDetailRoute(l, n.id)}
				pagination={pagination}
			/>
		</>
	);
}

export default withFailStates(SeriesList, ({ nodes }) => !nodes?.length);
