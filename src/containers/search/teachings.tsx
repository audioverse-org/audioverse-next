import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardRecording from '~components/molecules/card/recording';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

import { GetSearchResultsRecordingsQuery } from './__generated__/teachings';

export type SearchTeachingsProps = PaginatedProps<
	NonNullable<GetSearchResultsRecordingsQuery['recordings']['nodes']>[0],
	GetSearchResultsRecordingsQuery
>;

function SearchTeachings({ nodes, pagination }: SearchTeachingsProps) {
	const { query } = useRouter();
	const term = query.q as string;

	return (
		<PaginatedCardList
			pagination={pagination}
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
