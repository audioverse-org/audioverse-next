import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@/components/HOCs/withFailStates';
import CardRecording from '@/components/molecules/card/recording';
import PaginatedCardList from '@/components/organisms/paginatedCardList';
import { GetSearchResultsRecordingsQuery } from '@/lib/generated/graphql';
import { PaginatedProps } from '@/lib/getPaginatedStaticProps';
import { makeSearchRoute, makeSearchTeachingsRoute } from '@/lib/routes';
import useLanguageRoute from '@/lib/useLanguageRoute';

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
			backUrl={makeSearchRoute(languageRoute, term)}
			heading={
				<FormattedMessage
					id="searchTeachings__heading"
					defaultMessage="All Matching Teachings"
				/>
			}
			makeRoute={(lang, page) => makeSearchTeachingsRoute(lang, term, page)}
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
