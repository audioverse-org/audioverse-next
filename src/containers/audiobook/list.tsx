import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '~components/HOCs/withFailStates';
import CardSequence from '~components/molecules/card/sequence';
import PaginatedCardList from '~components/organisms/paginatedCardList';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import { GetAudiobookListPageDataQuery } from './__generated__/list';

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
			backUrl={root.lang(language).discover.collections.get()}
			heading={
				<FormattedMessage
					id="audiobookList__heading"
					defaultMessage="All Audiobooks"
				/>
			}
			makeRoute={(l, i) => root.lang(l).books.page(i).get()}
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
