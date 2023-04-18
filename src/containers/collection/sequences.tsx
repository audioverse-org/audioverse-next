import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { BaseColors } from '@lib/constants';
import {
	CollectionPivotFragment,
	GetCollectionSequencesPageDataQuery,
} from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import root from '@lib/routes';

import CollectionPivot from './pivot';

export type CollectionSequencesProps = PaginatedProps<
	NonNullable<
		NonNullable<
			NonNullable<
				GetCollectionSequencesPageDataQuery['collection']
			>['sequences']['nodes']
		>[0]
	>,
	GetCollectionSequencesPageDataQuery
>;

function CollectionSequences({
	nodes,
	data: { collection },
	pagination,
}: Must<CollectionSequencesProps> & {
	data: { collection: Must<CollectionPivotFragment> };
}): JSX.Element {
	return (
		<CollectionPivot collection={collection}>
			<LineHeading color={BaseColors.SALMON}>
				<FormattedMessage
					id="collectionSequencesDetail__heading"
					defaultMessage="All Series"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardSequence sequence={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					root
						.lang(languageRoute)
						.conferences.id(collection.id)
						.sequences.page(pageIndex)
						.get()
				}
				useInverse
			/>
		</CollectionPivot>
	);
}

export default withFailStates(CollectionSequences, {
	useShould404: ({ nodes }) => !nodes.length,
});
