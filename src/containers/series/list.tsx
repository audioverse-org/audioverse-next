import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardSequence from '~components/molecules/card/sequence';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

import { GetSeriesListPageDataQuery } from './__generated__/list';

export type SeriesListProps = PaginatedProps<
	NonNullable<GetSeriesListPageDataQuery['serieses']['nodes']>[0],
	GetSeriesListPageDataQuery
>;

function SeriesList({ nodes, pagination }: SeriesListProps): JSX.Element {
	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage
					id="seriesList__heading"
					defaultMessage="All Series"
				/>
			}
			makeRoute={(l, i) => root.lang(l).series.page(i).get()}
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
