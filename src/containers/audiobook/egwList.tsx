import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardSequence from '~components/molecules/card/sequence';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetEgwAudiobookListPageDataQuery } from './__generated__/egwList';

export type EgwAudiobooksListProps = PaginatedProps<
	NonNullable<GetEgwAudiobookListPageDataQuery['audiobooks']['nodes']>[0],
	GetEgwAudiobookListPageDataQuery
>;

export function EgwAudiobooksList({
	nodes,
	pagination,
}: EgwAudiobooksListProps): JSX.Element {
	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage
					id="egwAudiobookList__heading"
					defaultMessage="Ellen White"
				/>
			}
			makeRoute={(l, i) => root.lang(l).egwbooks.page(i).get()}
		>
			{nodes.map((node) => (
				<CardSequence sequence={node} egw={true} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

const WithFailStates = (props: Parameters<typeof EgwAudiobooksList>[0]) => (
	<AndFailStates
		Component={EgwAudiobooksList}
		componentProps={props}
		options={{ should404: ({ nodes }) => !nodes.length }}
	/>
);
export default WithFailStates;
