import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import ProgressBar from '@components/atoms/progressBar';
import Card from '@components/molecules/card';
import { useIsSequenceFavorited } from '@lib/api/useIsSequenceFavorited';
import { BaseColors } from '@lib/constants';
import {
	CardRecordingFragment,
	CardSequenceFragment,
	SequenceContentType,
} from '@lib/generated/graphql';
import { getRecordingTypeTheme } from '@lib/getRecordingTheme';
import { useFormattedDuration } from '@lib/time';
import useHover from '@lib/useHover';

import BookIcon from '../../../../public/img/fa-book-light.svg';
import FeatherIcon from '../../../../public/img/fa-feather-light.svg';
import ListIcon from '../../../../public/img/fa-list-alt.svg';
import MusicIcon from '../../../../public/img/fa-music-light.svg';
import LikeActiveIcon from '../../../../public/img/icon-like-active.svg';
import LikeIcon from '../../../../public/img/icon-like-light.svg';
import SuccessIcon from '../../../../public/img/icon-success-light.svg';
import IconButton from '../iconButton';
import PersonLockup from '../personLockup';
import TeaseRecordingStack from '../teaseRecordingStack';
import TypeLockup from '../typeLockup';

import styles from './sequence.module.scss';

interface CardCollectionProps {
	sequence: CardSequenceFragment;
	recordings?: CardRecordingFragment[] | null;
	slim?: boolean;
}

export default function CardSequence({
	sequence,
	recordings,
	slim,
}: CardCollectionProps): JSX.Element {
	const [ref, isHovered] = useHover();
	const intl = useIntl();
	const { isFavorited, toggleFavorited } = useIsSequenceFavorited(sequence.id);
	const router = useRouter();

	const {
		contentType,
		allRecordings,
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

	const inner = (
		<>
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
						contentType === SequenceContentType.StorySeason && styles.storyTitle
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
					values={{ count: allRecordings.aggregate?.count }}
				/>
			</Heading6>
			<div
				className={clsx(styles.details, isFavorited && styles.detailsWithLike)}
			>
				<div className={styles.duration}>{useFormattedDuration(duration)}</div>
				{viewerPlaybackCompletedPercentage >= 1 && <SuccessIcon />}
				<div className={styles.progress}>
					{viewerPlaybackCompletedPercentage > 0 && (
						<ProgressBar progress={viewerPlaybackCompletedPercentage} />
					)}
				</div>
				<IconButton
					ref={ref}
					Icon={isFavorited ? LikeActiveIcon : LikeIcon}
					onClick={(e) => {
						e.preventDefault();
						toggleFavorited();
					}}
					color={isFavorited ? accentColor : iconColor}
					backgroundColor={backgroundColor}
					className={clsx(styles.like, isFavorited && styles.likeActive)}
				/>
			</div>
			{recordings?.length ? (
				<div className={styles.subRecordings}>
					<TeaseRecordingStack
						recordings={recordings}
						theme={
							getRecordingTypeTheme(recordings[0].recordingContentType).theme
						}
						isOptionalLink
					/>
				</div>
			) : null}
		</>
	);

	const className = clsx(
		styles.container,
		isHovered && styles.bookmarkHovered,
		styles[contentType]
	);
	return (
		<Card>
			{slim ? (
				<div
					className={clsx(className, isHovered && styles.bookmarkHovered)}
					onClick={(e) => {
						e.stopPropagation();
						router.push(canonicalPath);
					}}
				>
					{inner}
				</div>
			) : (
				<Link href={canonicalPath}>
					<a className={className}>{inner}</a>
				</Link>
			)}
		</Card>
	);
}
