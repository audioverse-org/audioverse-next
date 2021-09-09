import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import ButtonBack from '@components/molecules/buttonBack';
import CardPerson from '@components/molecules/card/person';
import CardGroup from '@components/molecules/cardGroup';
import CollectionTypeLockup from '@components/molecules/collectionTypeLockup';
import Pagination from '@components/molecules/pagination';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import { GetCollectionPresentersPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeCollectionPresentersRoute } from '@lib/routes';

// TODO: DRY with other
import styles from './presenters.module.scss';

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
	data,
	pagination,
}: Must<CollectionPresentersProps>): JSX.Element {
	const { id, title, canonicalPath } = data.collection as any;

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
				<ButtonBack
					type="secondaryInverse"
					backUrl={canonicalPath}
					className={styles.back}
				/>
				<CollectionTypeLockup />
				<Heading2 unpadded className={styles.titleLockup}>
					{title}
				</Heading2>
			</TeaseHeader>
			<LineHeading color={BaseColors.SALMON}>
				<FormattedMessage
					id="collectionPresenterssDetail__heading"
					defaultMessage="All Speakers"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardPerson person={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					makeCollectionPresentersRoute(languageRoute, id, pageIndex)
				}
				useInverse
			/>
		</Tease>
	);
}

export default withFailStates(
	CollectionPresenters,
	({ nodes }) => !nodes.length
);
