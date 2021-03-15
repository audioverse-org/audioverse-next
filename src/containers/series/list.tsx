import React from 'react';
import { useIntl } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import PaginatedList from '@components/templates/paginatedList';
import { makeSeriesDetailRoute, makeSeriesListRoute } from '@lib/routes';
import { SeriesListStaticProps } from '@pages/[language]/series/page/[i]';

type Props = SeriesListStaticProps['props'];

function SeriesList({ nodes, pagination }: Props): JSX.Element {
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
