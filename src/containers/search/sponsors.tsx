import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardSponsor from '~components/molecules/card/sponsor';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import { GetSearchResultsSponsorsQuery } from './__generated__/sponsors';

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
			backUrl={root.lang(languageRoute).search.get({
				params: {
					q: term,
				},
			})}
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

export default withFailStates(SearchSponsors, {
	useShould404: (props: SearchSponsorsProps) => !props.nodes?.length,
});
