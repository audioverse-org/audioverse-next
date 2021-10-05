import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSponsor from '@components/molecules/card/sponsor';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetSearchResultsSponsorsQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSearchRoute, makeSearchSponsorsRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

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

export default withFailStates(
	SearchSponsors,
	(props: SearchSponsorsProps) => !props.nodes?.length
);
