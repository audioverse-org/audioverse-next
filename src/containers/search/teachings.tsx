import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardRecording from '~components/molecules/card/recording';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import { GetSearchResultsRecordingsQuery } from './__generated__/teachings';

export type SearchTeachingsProps = PaginatedProps<
	NonNullable<GetSearchResultsRecordingsQuery['recordings']['nodes']>[0],
	GetSearchResultsRecordingsQuery
>;

function SearchTeachings({ nodes, pagination }: SearchTeachingsProps) {
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
					id="searchTeachings__heading"
					defaultMessage="All Matching Teachings"
				/>
			}
			makeRoute={(lang, page) =>
				root
					.lang(lang)
					.search.teachings.page(page)
					.get({
						params: {
							q: term,
						},
					})
			}
		>
			{nodes.map((node) => (
				<CardRecording recording={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(SearchTeachings, {
	useShould404: (props: SearchTeachingsProps) => !props.nodes?.length,
});
