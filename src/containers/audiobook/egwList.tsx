import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardSequence from '~components/molecules/card/sequence';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

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
				<CardSequence
					sequence={node}
					slim={true}
					egw={true}
					key={node.canonicalPath}
				/>
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(EgwAudiobooksList, {
	useShould404: ({ nodes }) => !nodes.length,
});
