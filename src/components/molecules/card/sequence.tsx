import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import ProgressBar from '@components/atoms/progressBar';
import Card from '@components/molecules/card';
import { useIsSequenceFavorited } from '@lib/api/useIsSequenceFavorited';
import { BaseColors } from '@lib/constants';
import {
	CardSequenceFragment,
	SequenceContentType,
} from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';

import BookIcon from '../../../../public/img/fa-book.svg';
import FeatherIcon from '../../../../public/img/fa-feather.svg';
import ListIcon from '../../../../public/img/fa-list-alt.svg';
import MusicIcon from '../../../../public/img/fa-music.svg';
import LikeActiveIcon from '../../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../../public/img/icon-like-light.svg';
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
	const { isFavorited, toggleFavorited } = useIsSequenceFavorited(sequence.id);

	const {
		contentType,
		recordings,
		canonicalPath,
		duration,
		summary,
		title,
		viewerPlaybackCompletedPercentage,
		speakers,
		sequenceWriters: writers,
	} = sequence;

	const {
		Icon,
		accentColor,
		backgroundColor,
		iconColor,
		textColor,
		label,
		labelColor,
	} = (
		{
			[SequenceContentType.Audiobook]: {
				Icon: BookIcon,
				accentColor: BaseColors.SALMON,
				backgroundColor: BaseColors.BOOK_B,
				iconColor: BaseColors.WHITE,
				textColor: BaseColors.LIGHT_TONE,
				label: intl.formatMessage({
					id: 'cardSequence_audiobookType',
					defaultMessage: 'Book',
				}),
				labelColor: BaseColors.WHITE,
			},
			[SequenceContentType.MusicAlbum]: {
				Icon: MusicIcon,
				accentColor: BaseColors.RED,
				backgroundColor: BaseColors.SONG_B,
				iconColor: BaseColors.DARK,
				textColor: BaseColors.MID_TONE,
				label: intl.formatMessage({
					id: 'cardSequence_scriptureSongsType',
					defaultMessage: 'Scripture Songs',
				}),
				labelColor: BaseColors.DARK,
			},
			[SequenceContentType.Series]: {
				Icon: ListIcon,
				accentColor: BaseColors.RED,
				backgroundColor: BaseColors.CREAM,
				iconColor: BaseColors.DARK,
				textColor: BaseColors.MID_TONE,
				label: intl.formatMessage({
					id: 'cardSequence_seriesType',
					defaultMessage: 'Series',
				}),
				labelColor: BaseColors.DARK,
			},
			[SequenceContentType.StorySeason]: {
				Icon: FeatherIcon,
				accentColor: BaseColors.SALMON,
				backgroundColor: BaseColors.STORY_B,
				iconColor: BaseColors.WHITE,
				textColor: BaseColors.LIGHT_TONE,
				label: intl.formatMessage({
					id: 'cardSequence_storiesType',
					defaultMessage: 'Stories',
				}),
				labelColor: BaseColors.LIGHT_TONE,
			},
		} as const
	)[contentType];

	const persons =
		contentType === SequenceContentType.Audiobook ? writers : speakers;
	return (
		<Card>
			<Link href={canonicalPath}>
				<a className={clsx(styles.container, styles[contentType])}>
					<div className={styles.stretch}>
						<TypeLockup
							Icon={Icon}
							label={label}
							iconColor={accentColor}
							textColor={labelColor}
						/>
						<Heading2
							unpadded
							sans={
								contentType === SequenceContentType.MusicAlbum ||
								contentType === SequenceContentType.StorySeason
							}
							className={clsx(
								styles.title,
								contentType === SequenceContentType.Audiobook &&
									styles.audiobookTitle,
								contentType === SequenceContentType.StorySeason &&
									styles.storyTitle
							)}
						>
							{title}
						</Heading2>
						{summary && (
							<div
								dangerouslySetInnerHTML={{ __html: summary }}
								className={styles.kicker}
							></div>
						)}
						{!!persons.nodes?.length && (
							<div className={styles.persons}>
								{persons.nodes.map((person) => (
									<PersonLockup
										person={person}
										textColor={textColor}
										hoverColor={accentColor}
										key={person.canonicalPath}
										isLinked
										isOptionalLink
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
					<div
						className={clsx(
							styles.details,
							isFavorited && styles.detailsWithLike
						)}
					>
						<div className={styles.duration}>
							{useFormattedDuration(duration)}
						</div>
						{viewerPlaybackCompletedPercentage >= 1 && <SuccessIcon />}
						<div className={styles.progress}>
							{viewerPlaybackCompletedPercentage > 0 && (
								<ProgressBar progress={viewerPlaybackCompletedPercentage} />
							)}
						</div>
					</div>
					{/* TODO: conditional persons, sub-recordings */}
				</a>
			</Link>
			<IconButton
				Icon={isFavorited ? LikeActiveIcon : LikeIcon}
				onPress={() => toggleFavorited()}
				color={isFavorited ? accentColor : iconColor}
				backgroundColor={backgroundColor}
				className={styles.like}
			/>
		</Card>
	);
}
