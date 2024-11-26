import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardRecording from '~components/molecules/card/recording';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';

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

const WithFailStates = (props: Parameters<typeof SearchTeachings>[0]) => (
	<AndFailStates
		Component={SearchTeachings}
		componentProps={props}
		options={{
			should404: (props: SearchTeachingsProps) => !props.nodes?.length,
		}}
	/>
);
export default WithFailStates;
