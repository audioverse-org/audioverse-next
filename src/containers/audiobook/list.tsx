import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeAudiobookListRoute } from '@lib/routes/makeAudiobookListRoute';
import { makeDiscoverCollectionsRoute } from '@lib/routes/makeDiscoverCollectionsRoute';
import { GetAudiobookListPageDataQuery } from '@containers/audiobook/__generated__/list';

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

export default withFailStates(AudiobooksList, {
	useShould404: ({ nodes }) => !nodes.length,
});
