import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardCollection from '~components/molecules/card/collection';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

import { GetCollectionListPageDataQuery } from './__generated__/list';

export type CollectionListProps = PaginatedProps<
	NonNullable<GetCollectionListPageDataQuery['conferences']['nodes']>[0],
	GetCollectionListPageDataQuery
>;

// TODO: replace with collections landing page (featured, recent, trending, etc.)

function CollectionList({
	nodes,
	pagination,
}: CollectionListProps): JSX.Element {
	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage
					id="conferenceListPage__title"
					defaultMessage="All Conferences"
				/>
			}
			makeRoute={(l, i) => root.lang(l).conferences.page(i).get()}
		>
			{nodes.map((node) => (
				<CardCollection collection={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(CollectionList, {
	useShould404: ({ nodes }) => !nodes?.length,
});
