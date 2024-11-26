import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardSequence from '~components/molecules/card/sequence';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetAudiobookListPageDataQuery } from './__generated__/list';

export type AudiobooksListProps = PaginatedProps<
	NonNullable<GetAudiobookListPageDataQuery['audiobooks']['nodes']>[0],
	GetAudiobookListPageDataQuery
>;

export function AudiobooksList({
	nodes,
	pagination,
}: AudiobooksListProps): JSX.Element {
	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage id="audiobookList__heading" defaultMessage="Books" />
			}
			makeRoute={(l, i) => root.lang(l).books.page(i).get()}
		>
			{nodes.map((node) => (
				<CardSequence sequence={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

const WithFailStates = (props: Parameters<typeof AudiobooksList>[0]) => (
	<AndFailStates
		Component={AudiobooksList}
		componentProps={props}
		options={{ should404: ({ nodes }) => !nodes.length }}
	/>
);
export default WithFailStates;
