import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardSequence from '~components/molecules/card/sequence';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

import { GetSearchResultsSequencesQuery } from './__generated__/sequences';

export type SearchSequencesProps = PaginatedProps<
	NonNullable<GetSearchResultsSequencesQuery['sequences']['nodes']>[0],
	GetSearchResultsSequencesQuery
>;

function SearchSequences({ nodes, pagination }: SearchSequencesProps) {
	const { query } = useRouter();
	const term = query.q as string;

	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage
					id="searchSequences__heading"
					defaultMessage="All Matching Sequences"
				/>
			}
			makeRoute={(lang, page) =>
				root
					.lang(lang)
					.search.sequences.page(page)
					.get({
						params: {
							q: term,
						},
					})
			}
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
