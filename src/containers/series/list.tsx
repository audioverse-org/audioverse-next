import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardSequence from '~components/molecules/card/sequence';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';

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

const WithFailStates = (props: Parameters<typeof SeriesList>[0]) => (
	<AndFailStates
		Component={SeriesList}
		componentProps={props}
		options={{ should404: ({ nodes }) => !nodes?.length }}
	/>
);
export default WithFailStates;
