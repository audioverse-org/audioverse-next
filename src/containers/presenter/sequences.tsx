import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import LineHeading from '@components/atoms/lineHeading';
import RoundImage from '@components/atoms/roundImage';
import withFailStates from '@components/HOCs/withFailStates';
import ButtonBack from '@components/molecules/buttonBack';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import PersonTypeLockup from '@components/molecules/personTypeLockup';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import { BaseColors } from '@lib/constants';
import { GetPresenterSequencesPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makePresenterSequencesRoute } from '@lib/routes';

import styles from './recordings.module.scss';

export type PresenterSequencesProps = PaginatedProps<
	NonNullable<
		NonNullable<GetPresenterSequencesPageDataQuery['sequences']['nodes']>[0]
	>,
	GetPresenterSequencesPageDataQuery
>;

function PresenterSequences({
	nodes,
	data,
	pagination,
}: Must<PresenterSequencesProps>): JSX.Element {
	const { id, name, canonicalPath, imageWithFallback } = data.person as any;

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
				<ButtonBack backUrl={canonicalPath} className={styles.back} />
				<PersonTypeLockup />
				<div className={styles.titleLockup}>
					<div className={styles.image}>
						<RoundImage image={imageWithFallback.url} alt={name} />
					</div>
					<Heading2 sans unpadded>
						{name}
					</Heading2>
				</div>
			</TeaseHeader>
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="presenterSequencesDetail__heading"
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
					makePresenterSequencesRoute(languageRoute, id, pageIndex)
				}
			/>
		</Tease>
	);
}

export default withFailStates(PresenterSequences, ({ nodes }) => !nodes.length);
