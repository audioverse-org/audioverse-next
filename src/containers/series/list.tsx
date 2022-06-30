import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeSeriesListRoute } from '@lib/routes/makeSeriesListRoute';
import { makeDiscoverCollectionsRoute } from '@lib/routes/makeDiscoverCollectionsRoute';
import { GetSeriesListPageDataQuery } from '@containers/series/__generated__/list';

export type SeriesListProps = PaginatedProps<
	NonNullable<GetSeriesListPageDataQuery['serieses']['nodes']>[0],
	GetSeriesListPageDataQuery
>;

function SeriesList({ nodes, pagination }: SeriesListProps): JSX.Element {
	const language = useLanguageRoute();

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={makeDiscoverCollectionsRoute(language)}
			heading={
				<FormattedMessage
					id="seriesList__heading"
					defaultMessage="All Series"
				/>
			}
			makeRoute={makeSeriesListRoute}
		>
			{nodes.map((node) => (
				<CardSequence sequence={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(SeriesList, {
	useShould404: ({ nodes }) => !nodes?.length,
});
