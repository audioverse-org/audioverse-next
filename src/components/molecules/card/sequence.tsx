import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import ProgressBar from '@components/atoms/progressBar';
import Card from '@components/molecules/card';
import { CardSequenceFragment } from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';

import ListIcon from '../../../../public/img/fa-list-alt.svg';
import LikeActiveIcon from '../../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../../public/img/icon-like.svg';
import SuccessIcon from '../../../../public/img/icon-success-light.svg';
import IconButton from '../iconButton';
import PersonLockup from '../personLockup';
import TypeLockup from '../typeLockup';

import styles from './sequence.module.scss';

interface CardCollectionProps {
	sequence: CardSequenceFragment;
}

export default function CardSequence({
	sequence,
}: CardCollectionProps): JSX.Element {
	const intl = useIntl();

	const {
		recordings,
		canonicalPath,
		duration,
		description,
		summary,
		title,
		viewerHasFavorited,
		viewerPlaybackCompletedPercentage,
		persons,
	} = sequence;
	return (
		<Card>
			<div className={styles.container}>
				<div className={styles.stretch}>
					<TypeLockup
						Icon={ListIcon}
						label={intl.formatMessage({
							id: 'cardSequence_hatTitle',
							defaultMessage: 'Series',
							description: 'Card sequence hat title',
						})}
						iconColor={BaseColors.RED}
						textColor={BaseColors.DARK}
					/>
					<Heading2 unpadded className={styles.title}>
						<Link href={canonicalPath}>
							<a>{title}</a>
						</Link>
					</Heading2>
					{!!(summary || description) && (
						<div
							dangerouslySetInnerHTML={{ __html: summary || description }}
							className={styles.kicker}
						></div>
					)}

					{persons.nodes?.length && (
						<div className={styles.persons}>
							{persons.nodes.map((person) => (
								<PersonLockup
									person={person}
									textColor={BaseColors.DARK}
									key={person.canonicalPath}
									isLinked
									small
								/>
							))}
						</div>
					)}
					{/* TODO: replace with "...and X more" format */}
				</div>
				<Heading6 sans unpadded uppercase loose className={styles.partsLabel}>
					<FormattedMessage
						id="cardSequence_sequenceLabel"
						defaultMessage="{count} parts"
						description="Card sequence recording count label"
						values={{ count: recordings.aggregate?.count }}
					/>
				</Heading6>
				<div className={styles.details}>
					<div className={styles.duration}>
						{useFormattedDuration(duration)}
					</div>
					{viewerPlaybackCompletedPercentage >= 1 && <SuccessIcon />}
					<div className={styles.progress}>
						{viewerPlaybackCompletedPercentage > 0 && (
							<ProgressBar progress={viewerPlaybackCompletedPercentage} />
						)}
					</div>
					<IconButton
						Icon={viewerHasFavorited ? LikeActiveIcon : LikeIcon}
						onPress={() => void 0}
						color={viewerHasFavorited ? BaseColors.RED : BaseColors.DARK}
						backgroundColor={BaseColors.CREAM}
						className={styles.like}
					/>
				</div>
				{/* TODO: hover/link?, conditional persons, sub-recordings */}
			</div>
		</Card>
	);
}
