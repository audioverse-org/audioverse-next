import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardCollection from '~components/molecules/card/collection';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';

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

const WithFailStates = (props: Parameters<typeof CollectionList>[0]) => (
	<AndFailStates
		Component={CollectionList}
		componentProps={props}
		options={{ should404: ({ nodes }) => !nodes?.length }}
	/>
);
export default WithFailStates;
