import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSponsor from '@components/molecules/card/sponsor';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeSearchRoute } from '@lib/routes/makeSearchRoute';
import { makeSearchSponsorsRoute } from '@lib/routes/makeSearchSponsorsRoute';
import { GetSearchResultsSponsorsQuery } from '@containers/search/__generated__/sponsors';

export type SearchSponsorsProps = PaginatedProps<
	NonNullable<GetSearchResultsSponsorsQuery['sponsors']['nodes']>[0],
	GetSearchResultsSponsorsQuery
>;

function SearchSponsors({ nodes, pagination }: SearchSponsorsProps) {
	const languageRoute = useLanguageRoute();
	const { query } = useRouter();
	const term = query.q as string;

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={makeSearchRoute(languageRoute, term)}
			heading={
				<FormattedMessage
					id="searchSponsors__heading"
					defaultMessage="All Matching Sponsors"
				/>
			}
			makeRoute={(lang, page) => makeSearchSponsorsRoute(lang, term, page)}
		>
			{nodes.map((node) => (
				<CardSponsor sponsor={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(SearchSponsors, {
	useShould404: (props: SearchSponsorsProps) => !props.nodes?.length,
});
