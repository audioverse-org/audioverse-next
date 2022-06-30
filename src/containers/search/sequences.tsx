import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeSearchRoute } from '@lib/routes/makeSearchRoute';
import { makeSearchSequencesRoute } from '@lib/routes/makeSearchSequencesRoute';
import { GetSearchResultsSequencesQuery } from '@containers/search/__generated__/sequences';

export type SearchSequencesProps = PaginatedProps<
	NonNullable<GetSearchResultsSequencesQuery['sequences']['nodes']>[0],
	GetSearchResultsSequencesQuery
>;

function SearchSequences({ nodes, pagination }: SearchSequencesProps) {
	const languageRoute = useLanguageRoute();
	const { query } = useRouter();
	const term = query.q as string;

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={makeSearchRoute(languageRoute, term)}
			heading={
				<FormattedMessage
					id="searchSequences__heading"
					defaultMessage="All Matching Sequences"
				/>
			}
			makeRoute={(lang, page) => makeSearchSequencesRoute(lang, term, page)}
		>
			{nodes.map((node) => (
				<CardSequence sequence={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(SearchSequences, {
	useShould404: (props: SearchSequencesProps) => !props.nodes?.length,
});
