import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import withFailStates from '~components/HOCs/withFailStates';
import CardRecording from '~components/molecules/card/recording';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import { Must } from '~src/types/types';

import { CollectionPivotFragment } from './__generated__/pivot';
import { GetCollectionTeachingsPageDataQuery } from './__generated__/teachings';
import CollectionPivot from './pivot';

export type CollectionTeachingsProps = PaginatedProps<
	NonNullable<
		NonNullable<
			NonNullable<
				GetCollectionTeachingsPageDataQuery['collection']
			>['recordings']['nodes']
		>[0]
	>,
	GetCollectionTeachingsPageDataQuery
>;

function CollectionTeachings({
	nodes,
	data: { collection },
	pagination,
}: Must<CollectionTeachingsProps> & {
	data: { collection: Must<CollectionPivotFragment> };
}): JSX.Element {
	return (
		<CollectionPivot collection={collection}>
			<LineHeading color={BaseColors.SALMON}>
				<FormattedMessage
					id="ccollectionTeachingsDetail__heading"
					defaultMessage="All Individual Teachings"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardRecording recording={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					root
						.lang(languageRoute)
						.conferences.id(collection.id)
						.teachings.page(pageIndex)
						.get()
				}
				useInverse
			/>
		</CollectionPivot>
	);
}

export default withFailStates(CollectionTeachings, {
	useShould404: ({ nodes }) => !nodes.length,
});
