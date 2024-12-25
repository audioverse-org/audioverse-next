import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardSequence from '~components/molecules/card/sequence';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

import { GetAudiobookListPageDataQuery } from './__generated__/list';

export type AudiobooksListProps = PaginatedProps<
	NonNullable<GetAudiobookListPageDataQuery['audiobooks']['nodes']>[0],
	GetAudiobookListPageDataQuery
>;

function AudiobooksList({
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

export default withFailStates(AudiobooksList, {
	useShould404: ({ nodes }) => !nodes.length,
});
