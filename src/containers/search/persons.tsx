import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardPerson from '@components/molecules/card/person';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeSearchRoute } from '@lib/routes/makeSearchRoute';
import { makeSearchPersonsRoute } from '@lib/routes/makeSearchPersonsRoute';
import { GetSearchResultsPersonsQuery } from '@containers/search/__generated__/persons';

export type SearchPersonsProps = PaginatedProps<
	NonNullable<GetSearchResultsPersonsQuery['persons']['nodes']>[0],
	GetSearchResultsPersonsQuery
>;

function SearchPersons({ nodes, pagination }: SearchPersonsProps) {
	const languageRoute = useLanguageRoute();
	const { query } = useRouter();
	const term = query.q as string;

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={makeSearchRoute(languageRoute, term)}
			heading={
				<FormattedMessage
					id="searchPersons__heading"
					defaultMessage="All Matching Persons"
				/>
			}
			makeRoute={(lang, page) => makeSearchPersonsRoute(lang, term, page)}
		>
			{nodes.map((node) => (
				<CardPerson person={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(SearchPersons, {
	useShould404: (props: SearchPersonsProps) => !props.nodes?.length,
});
