import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import ButtonBack from '@components/molecules/buttonBack';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import CollectionTypeLockup from '@components/molecules/collectionTypeLockup';
import Pagination from '@components/molecules/pagination';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import { GetCollectionSequencesPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeCollectionSequencesRoute } from '@lib/routes';

import styles from './sequences.module.scss';

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
	data,
	pagination,
}: Must<CollectionSequencesProps>): JSX.Element {
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
					makeCollectionSequencesRoute(languageRoute, id, pageIndex)
				}
				useInverse
			/>
		</Tease>
	);
}

export default withFailStates(
	CollectionSequences,
	({ nodes }) => !nodes.length
);
