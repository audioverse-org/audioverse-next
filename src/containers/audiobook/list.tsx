import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetAudiobookListPageDataQuery } from '@containers/audiobook/list.gql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import {
	makeAudiobookListRoute,
	makeDiscoverCollectionsRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type AudiobooksListProps = PaginatedProps<
	NonNullable<GetAudiobookListPageDataQuery['audiobooks']['nodes']>[0],
	GetAudiobookListPageDataQuery
>;

export function AudiobooksList({
	nodes,
	pagination,
}: AudiobooksListProps): JSX.Element {
	const language = useLanguageRoute();
	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={makeDiscoverCollectionsRoute(language)}
			heading={
				<FormattedMessage
					id="audiobookList__heading"
					defaultMessage="All Audiobooks"
				/>
			}
			makeRoute={makeAudiobookListRoute}
		>
			{nodes.map((node) => (
				<CardSequence sequence={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(AudiobooksList, ({ nodes }) => !nodes.length);
