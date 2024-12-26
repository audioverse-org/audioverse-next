import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardSponsor from '~components/molecules/card/sponsor';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';

import { GetSearchResultsSponsorsQuery } from './__generated__/sponsors';

export type SearchSponsorsProps = PaginatedProps<
	NonNullable<GetSearchResultsSponsorsQuery['sponsors']['nodes']>[0],
	GetSearchResultsSponsorsQuery
>;

function SearchSponsors({ nodes, pagination }: SearchSponsorsProps) {
	const { query } = useRouter();
	const term = query.q as string;

	return (
		<PaginatedCardList
			pagination={pagination}
			heading={
				<FormattedMessage
					id="searchSponsors__heading"
					defaultMessage="All Matching Sponsors"
				/>
			}
			makeRoute={(lang, page) =>
				root
					.lang(lang)
					.search.sponsors.page(page)
					.get({
						params: {
							q: term,
						},
					})
			}
		>
			{nodes.map((node) => (
				<CardSponsor sponsor={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

const WithFailStates = (props: Parameters<typeof SearchSponsors>[0]) => (
	<AndFailStates
		Component={SearchSponsors}
		componentProps={props}
		options={{
			should404: (props: SearchSponsorsProps) => !props.nodes?.length,
		}}
	/>
);
export default WithFailStates;
