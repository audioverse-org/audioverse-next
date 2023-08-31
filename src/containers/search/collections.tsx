import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardCollection from '~components/molecules/card/collection';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

import { GetSearchResultsCollectionsQuery } from './__generated__/collections';

export type SearchCollectionsProps = PaginatedProps<
	NonNullable<GetSearchResultsCollectionsQuery['collections']['nodes']>[0],
	GetSearchResultsCollectionsQuery
>;

function SearchCollections({ nodes, pagination }: SearchCollectionsProps) {
	const { query } = useRouter();
	const term = query.q as string;

	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage
					id="searchCollections__heading"
					defaultMessage="All Matching Collections"
				/>
			}
			makeRoute={(lang, page) =>
				root
					.lang(lang)
					.search.collections.page(page)
					.get({
						params: {
							q: term,
						},
					})
			}
		>
			{nodes.map((node) => (
				<CardCollection collection={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(SearchCollections, {
	useShould404: (props: SearchCollectionsProps) => !props.nodes?.length,
});
