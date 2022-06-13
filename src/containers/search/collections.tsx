import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardCollection from '@components/molecules/card/collection';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetSearchResultsCollectionsQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSearchCollectionsRoute, makeSearchRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type SearchCollectionsProps = PaginatedProps<
	NonNullable<GetSearchResultsCollectionsQuery['collections']['nodes']>[0],
	GetSearchResultsCollectionsQuery
>;

function SearchCollections({ nodes, pagination }: SearchCollectionsProps) {
	const languageRoute = useLanguageRoute();
	const { query } = useRouter();
	const term = query.q as string;

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={makeSearchRoute(languageRoute, term)}
			heading={
				<FormattedMessage
					id="searchCollections__heading"
					defaultMessage="All Matching Collections"
				/>
			}
			makeRoute={(lang, page) => makeSearchCollectionsRoute(lang, term, page)}
		>
			{nodes.map((node) => (
				<CardCollection collection={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(SearchCollections, {
	should404: (props: SearchCollectionsProps) => !props.nodes?.length,
});
