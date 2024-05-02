import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import ProgressBar from '~components/atoms/progressBar';
import Card from '~components/molecules/card';
import { useIsSequenceFavorited } from '~lib/api/useIsSequenceFavorited';
import { BaseColors } from '~lib/constants';
import { getRecordingTypeTheme } from '~lib/getRecordingTheme';
import { useFormattedDuration } from '~lib/time';
import useHover from '~lib/useHover';
import BookIcon from '~public/img/icons/fa-book-light.svg';
import FeatherIcon from '~public/img/icons/fa-feather-light.svg';
import ListIcon from '~public/img/icons/fa-list-alt.svg';
import MusicIcon from '~public/img/icons/fa-music-light.svg';
import SeedlingIcon from '~public/img/icons/fa-seedling.svg';
import IconClosure from '~public/img/icons/icon-closure.svg';
import IconDisclosure from '~public/img/icons/icon-disclosure.svg';
import SuccessIcon from '~public/img/icons/icon-success-light.svg';
import { SequenceContentType } from '~src/__generated__/graphql';
import NameMatcher from '~src/components/atoms/nameMatcher';
import { analytics } from '~src/lib/analytics';

import ButtonFavorite from '../buttonFavorite';
import PersonLockup from '../personLockup';
import TeaseRecordingStack from '../teaseRecordingStack';
import TypeLockup from '../typeLockup';
import { CardRecordingFragment } from './__generated__/recording';
import { CardSequenceFragment } from './__generated__/sequence';
import styles from './sequence.module.scss';

interface CardCollectionProps {
	sequence: CardSequenceFragment;
	recordings?: CardRecordingFragment[] | null;
	slim?: boolean;
	egw?: boolean; //egw
}

export default function CardSequence({
	sequence,
	recordings,
	slim,
	egw,
}: CardCollectionProps): JSX.Element {
	const [ref, isHovered] = useHover<HTMLButtonElement>();
	const [subRef, isSubHovered] = useHover<HTMLDivElement>();
	const intl = useIntl();
	const { isFavorited, toggleFavorited, playbackCompletedPercentage } =
		useIsSequenceFavorited(sequence.id);
	const [personsExpanded, setPersonsExpanded] = useState(false);
	//const [thisPerson, setThisPerson] = useState(false);
	const router = useRouter();
	const isBibleBook = sequence.contentType === SequenceContentType.BibleBook;

	const {
		contentType,
		allRecordings,
		canonicalPath,
		collection,
		duration,
		summary,
		title,
		speakers,
		sequenceWriters: writers,
		id,
	} = sequence;

	const { Icon, accentColor, backgroundColor, textColor, label, labelColor } = (
		{
			[SequenceContentType.Audiobook]: {
				Icon: egw ? FeatherIcon : BookIcon,
				accentColor: BaseColors.SALMON,
				backgroundColor: egw ? BaseColors.DARK : BaseColors.BOOK_B,
				iconColor: BaseColors.WHITE,
				textColor: BaseColors.LIGHT_TONE,
				label: egw
					? intl.formatMessage({
							id: 'cardSequence_egwAudiobookType',
							defaultMessage: 'ELLEN WHITE',
					  })
					: intl.formatMessage({
							id: 'cardSequence_audiobookType',
							defaultMessage: 'Book',
					  }),
				labelColor: BaseColors.WHITE,
			},
			[SequenceContentType.BibleBook]: {
				Icon: BookIcon,
				accentColor: BaseColors.SALMON,
				backgroundColor: BaseColors.BIBLE_H,
				iconColor: BaseColors.WHITE,
				textColor: BaseColors.LIGHT_TONE,
				label:
					collection?.title
						.split(' ')
						.map((n) => n[0])
						.join('')
						.toUpperCase() + ' Bible',
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
				Icon: SeedlingIcon,
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
		(contentType === SequenceContentType.Audiobook
			? writers.nodes
			: speakers.nodes) || [];

	const isPersonMatched = persons.some((person) =>
		NameMatcher({ person, targetName: 'Ellen G. White' })
	);
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
						(contentType === SequenceContentType.Audiobook || isBibleBook) &&
							styles.audiobookTitle,
						isBibleBook && styles.bibleBookTitle,
						contentType === SequenceContentType.StorySeason && styles.storyTitle
					)}
				>
					{title}
				</Heading2>
				{(isBibleBook || egw) && (
					<Heading6
						loose
						sans
						uppercase
						ultralight
						className={egw ? styles.bookReadBy : styles.bibleReadBy}
					>
						{(speakers.nodes || [])[0]?.name && (
							<FormattedMessage
								id="cardSequence_readByLabel"
								defaultMessage="Read By {name}"
								values={{
									name: (speakers.nodes || [])[0]?.name,
								}}
							/>
						)}
					</Heading6>
				)}
				{summary && (
					<div
						dangerouslySetInnerHTML={{ __html: summary }}
						className={styles.kicker}
					></div>
				)}
				{!!persons.length &&
					!egw &&
					sequence.contentType !== SequenceContentType.BibleBook &&
					(!recordings?.length ||
						sequence.contentType === SequenceContentType.Audiobook ||
						sequence.contentType === SequenceContentType.MusicAlbum) && (
						<div className={styles.persons}>
							{(personsExpanded ? persons : persons.slice(0, 2)).map((p) => (
								<PersonLockup
									person={p}
									textColor={textColor}
									hoverColor={accentColor}
									key={p.canonicalPath}
									isLinked
									isOptionalLink
									small
								/>
							))}
							{persons.length > 2 && (
								<div
									className={styles.morePersons}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setPersonsExpanded(!personsExpanded);
									}}
								>
									{personsExpanded ? <IconClosure /> : <IconDisclosure />}
									<Heading6 sans loose unpadded uppercase>
										{personsExpanded ? (
											<FormattedMessage
												id="molecule-teaseRecording__lessPersons"
												defaultMessage="Show less"
											/>
										) : (
											<FormattedMessage
												id="molecule-teaseRecording__morePersons"
												defaultMessage="{count} more"
												values={{
													count: persons.length - 2,
												}}
											/>
										)}
									</Heading6>
								</div>
							)}
						</div>
					)}
			</div>
			<Heading6 sans unpadded uppercase loose className={styles.partsLabel}>
				{isBibleBook ? (
					<FormattedMessage
						id="cardSequence_chaptersLabel"
						defaultMessage="{count} chapters"
						values={{ count: allRecordings.aggregate?.count }}
					/>
				) : (
					<FormattedMessage
						id="cardSequence_sequenceLabel"
						defaultMessage="{count} parts"
						description="Card sequence recording count label"
						values={{ count: allRecordings.aggregate?.count }}
					/>
				)}
			</Heading6>
			<div
				className={clsx(styles.details, isFavorited && styles.detailsWithLike)}
			>
				<div className={styles.duration}>{useFormattedDuration(duration)}</div>
				{playbackCompletedPercentage >= 1 && <SuccessIcon />}
				<div className={styles.progress}>
					{playbackCompletedPercentage > 0 && (
						<ProgressBar progress={playbackCompletedPercentage} />
					)}
				</div>
				<ButtonFavorite
					isFavorited={!!isFavorited}
					toggleFavorited={toggleFavorited}
					ref={ref}
					backgroundColor={backgroundColor}
					light
					className={clsx(styles.like, isFavorited && styles.likeActive)}
				/>
			</div>
			{recordings?.length ? (
				<div className={styles.subRecordings} ref={subRef}>
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
		(isHovered || isSubHovered) && styles.otherHovered,
		egw
			? styles['EGWAUDIOBOOK']
			: isPersonMatched
			? styles['EGWAUDIOBOOK']
			: styles[contentType]
	);
	const linkUrl =
		(isBibleBook && (sequence.allRecordings.nodes || [])[0].canonicalPath) ||
		canonicalPath;

	return (
		<Card>
			{slim ? (
				<div
					className={className}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();

						analytics.track('Card click', {
							type: sequence.contentType,
							id,
							title,
						});
						router.push(linkUrl);
					}}
				>
					{inner}
				</div>
			) : (
				<Link href={linkUrl} legacyBehavior>
					<a
						className={className}
						onClick={() => {
							analytics.track('Card click', {
								type: sequence.contentType,
								id,
								title,
							});
						}}
					>
						{inner}
					</a>
				</Link>
			)}
		</Card>
	);
}
