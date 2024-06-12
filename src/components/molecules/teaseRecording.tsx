import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading3 from '~components/atoms/heading3';
import Heading6 from '~components/atoms/heading6';
import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { useIsRecordingFavorited } from '~lib/api/useIsRecordingFavorited';
import { BaseColors } from '~lib/constants';
import { useFormattedDuration } from '~lib/time';
import usePlaybackSession, { PlaySource } from '~lib/usePlaybackSession';
import IconClosure from '~public/img/icons/icon-closure.svg';
import IconDisclosure from '~public/img/icons/icon-disclosure.svg';
import IconListeningAnimated from '~public/img/icons/icon-listening-animated.svg';
import SuccessIcon from '~public/img/icons/icon-success-light.svg';
import IconPlay from '~public/img/icons/play-circle.svg';

import { analytics } from '../../lib/analytics';
//import PlayProgress from '../atoms/playProgress';
import { TeaseRecordingFragment } from './__generated__/teaseRecording';
import ButtonFavorite from './buttonFavorite';
import { CardTheme } from './card/base/withCardTheme';
import IconButton from './iconButton';
import PersonLockup from './personLockup';
import styles from './teaseRecording.module.scss';

const isThemeDark = (theme: CardTheme): boolean =>
	['audiobookTrack', 'story', 'topic'].includes(theme);

type Props = {
	recording: TeaseRecordingFragment;
	theme: CardTheme;
	unpadded?: boolean;
	playlistRecordings?: AndMiniplayerFragment[];
	small?: boolean;
	isOptionalLink?: boolean;
	disableUserFeatures?: boolean;
	disablePlayback?: boolean;
};

export default function TeaseRecording({
	recording,
	theme,
	unpadded,
	playlistRecordings,
	small,
	isOptionalLink,
	disableUserFeatures,
	disablePlayback = false,
}: Props): JSX.Element {
	const intl = useIntl();
	const { isFavorited, toggleFavorited } = useIsRecordingFavorited(
		recording.id,
		recording.sequence?.id,
		disableUserFeatures
	);
	const router = useRouter();
	const session = usePlaybackSession(recording, { playlistRecordings });
	const progress = session.progress;
	const [personsExpanded, setPersonsExpanded] = useState(false);

	const backgroundColor = {
		audiobookTrack: BaseColors.BOOK_B,
		chapter: BaseColors.BIBLE_B,
		sermon: BaseColors.WHITE,
		song: BaseColors.SONG_B,
		story: BaseColors.STORY_B,
		playlistItem: BaseColors.PLAYLIST_B,
		topic: BaseColors.TOPIC_B,
	}[theme];
	const isDarkTheme = isThemeDark(theme);
	const personTextColor = isDarkTheme
		? BaseColors.LIGHT_TONE
		: BaseColors.MID_TONE;
	const hidePresenters =
		['audiobookTrack', 'chapter'].includes(theme) ||
		(theme === 'song' && small);

	const inner = (
		<>
			<div className={styles.title}>
				{small ? (
					<Heading3 unpadded className={styles.heading}>
						{recording.title}
					</Heading3>
				) : (
					<Heading2>{recording.title}</Heading2>
				)}
			</div>
			{!hidePresenters && (
				<div>
					{(personsExpanded
						? recording.persons
						: recording.persons.slice(0, 2)
					).map((p) => (
						<div key={p.canonicalPath} className={styles.presenter}>
							<PersonLockup
								person={p}
								textColor={personTextColor}
								isLinked
								isOptionalLink
								hoverColor={isDarkTheme ? BaseColors.SALMON : BaseColors.RED}
								small={small}
							/>
						</div>
					))}
					{recording.persons.length > 2 && (
						<div
							className={clsx(styles.morePersons, isDarkTheme && styles.dark)}
							onClick={(e) => {
								e.preventDefault();
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
											count: recording.persons.length - 2,
										}}
									/>
								)}
							</Heading6>
						</div>
					)}
				</div>
			)}
			<div className={styles.flexGrow}>
				<div
					className={clsx(
						styles.details,
						isFavorited && styles.detailsWithLike
					)}
				>
					{/* Play should be here */}
					{!disablePlayback && (
						<div className={styles.play}>
							{session.isPlaying ? (
								// isPlaying, progressPercentage=0, activeColor, inactiveColor, isCurrentTrack
								//<PlayProgress isPlaying={session.isPlaying } activeColor='' inactiveColor='' progressPercentage={session.progress} isCurrentTrack={session.}/>,
								<IconButton
									Icon={IconListeningAnimated}
									onClick={() => {
										// let propagate to recording push
									}}
									color={isDarkTheme ? BaseColors.WHITE : BaseColors.RED}
									backgroundColor={backgroundColor}
								/>
							) : (
								<IconButton
									Icon={IconPlay}
									onClick={(e) => {
										e.preventDefault();
										session.play(PlaySource.Tease);
									}}
									color={isDarkTheme ? BaseColors.WHITE : BaseColors.RED}
									backgroundColor={backgroundColor}
									aria-label={intl.formatMessage({
										id: 'playButton__playLabel',
										defaultMessage: 'play',
										description: 'play button play label',
									})}
								/>
							)}
						</div>
					)}
					{/* Play should end here */}
					<span className={styles.duration}>
						{useFormattedDuration(recording.duration)}
					</span>
					{progress >= 1 && <SuccessIcon />}
				</div>
			</div>
		</>
	);

	return (
		<div className={clsx(styles.container, small && styles.small)}>
			{isOptionalLink ? (
				<div
					className={clsx(
						styles.content,
						styles.contentOptionalLink,
						unpadded && styles.unpadded
					)}
					onClick={(e) => {
						e.stopPropagation();

						analytics.track('Card click', {
							type: recording.recordingContentType,
							id: recording.id,
							title: recording.title,
						});
						router.push(recording.canonicalPath);
					}}
				>
					{inner}
				</div>
			) : (
				<Link href={recording.canonicalPath} legacyBehavior>
					<a
						className={clsx(styles.content, unpadded && styles.unpadded)}
						onClick={() => {
							analytics.track('Card click', {
								type: recording.recordingContentType,
								id: recording.id,
								title: recording.title,
							});
						}}
					>
						{inner}
					</a>
				</Link>
			)}

			{!disableUserFeatures && (
				<ButtonFavorite
					favoritedType="Recording"
					favoritedId={recording.id}
					favoritedTitle={recording.title}
					isFavorited={!!isFavorited}
					toggleFavorited={toggleFavorited}
					backgroundColor={backgroundColor}
					className={clsx(
						styles.like,
						unpadded && styles.likeUnpadded,
						isFavorited && styles.likeActive
					)}
					light
				/>
			)}
		</div>
	);
}
