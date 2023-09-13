import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardTopic from '~src/components/molecules/card/topic';
import PaginatedCardList from '~src/components/organisms/paginatedCardList';
import { PaginatedProps } from '~src/lib/getPaginatedStaticProps';
import root from '~src/lib/routes';

import { GetTopicListDataQuery } from './__generated__/list';

export type CollectionListProps = PaginatedProps<
	NonNullable<GetTopicListDataQuery['topics']['nodes']>[0],
	GetTopicListDataQuery
>;

export default function Topics({
	nodes,
	pagination,
}: CollectionListProps): JSX.Element {
	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage
					id="topicListPage__title"
					defaultMessage="All Topics"
				/>
			}
			makeRoute={(l, i) => root.lang(l).topics.page(i).get()}
		>
			{nodes.map((node) => (
				<CardTopic topic={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}
