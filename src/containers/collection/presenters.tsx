import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import CardPerson from '~components/molecules/card/person';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import { Must } from '~src/types/types';

import { CollectionPivotFragment } from './__generated__/pivot';
import { GetCollectionPresentersPageDataQuery } from './__generated__/presenters';
import CollectionPivot from './pivot';

export type CollectionPresentersProps = PaginatedProps<
	NonNullable<
		NonNullable<
			NonNullable<
				GetCollectionPresentersPageDataQuery['collection']
			>['persons']['nodes']
		>[0]
	>,
	GetCollectionPresentersPageDataQuery
>;

function CollectionPresenters({
	nodes,
	data: { collection },
	pagination,
}: Must<CollectionPresentersProps> & {
	data: { collection: Must<CollectionPivotFragment> };
}): JSX.Element {
	const lang = useLanguageRoute();
	return (
		<CollectionPivot collection={collection}>
			<LineHeading color={BaseColors.SALMON}>
				<FormattedMessage
					id="collectionPresenterssDetail__heading"
					defaultMessage="All Presenters"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardPerson
						person={{
							...node,
							canonicalPath: root
								.lang(lang)
								.conferences.id(collection.id)
								.presenters.id(node.id)
								.get(),
						}}
						key={node.canonicalPath}
						midinit={true}
					/>
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					root
						.lang(languageRoute)
						.conferences.id(collection.id)
						.presenters.page(pageIndex)
						.get()
				}
				useInverse
			/>
		</CollectionPivot>
	);
}

const WithFailStates = (props: Parameters<typeof CollectionPresenters>[0]) => (
	<AndFailStates
		Component={CollectionPresenters}
		componentProps={props}
		options={{ should404: ({ nodes }) => !nodes.length }}
	/>
);
export default WithFailStates;
