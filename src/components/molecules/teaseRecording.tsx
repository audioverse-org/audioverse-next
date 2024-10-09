import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Heading2 from '~components/atoms/heading2';
import Heading3 from '~components/atoms/heading3';
import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { BaseColors } from '~lib/constants';

import { analytics } from '../../lib/analytics';
import { TeaseRecordingFragment } from './__generated__/teaseRecording';
import ButtonAddToPlaylist from './buttonAddToPlaylist';
import PlayButton from './buttonPlayCircle';
import { CardTheme } from './card/base/withCardTheme';
import PersonLockup from './personLockup';
import styles from './teaseRecording.module.scss';

const isThemeDark = (theme: CardTheme): boolean =>
	['audiobookTrack', 'story', 'topic'].includes(theme);

type Props = {
	recording: TeaseRecordingFragment;
	theme: CardTheme;
	unpadded?: boolean;
	fullBleed?: boolean;
	playlistRecordings?: AndMiniplayerFragment[];
	small?: boolean;
	isOptionalLink?: boolean;
	disableUserFeatures?: boolean;
	disablePlayback?: boolean;
	altPath?: string;
};

export default function TeaseRecording({
	recording,
	theme,
	unpadded,
	fullBleed,
	playlistRecordings,
	small,
	isOptionalLink,
	disableUserFeatures,
	disablePlayback = false,
	altPath,
}: Props): JSX.Element {
	const router = useRouter();

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

	const iconColor = isDarkTheme ? BaseColors.WHITE : BaseColors.DARK;

	const personTextColor = isDarkTheme
		? BaseColors.LIGHT_TONE
		: BaseColors.MID_TONE;
	const hidePresenters =
		['audiobookTrack', 'chapter'].includes(theme) ||
		(theme === 'song' && small);

	const inner = (
		<>
			<div className={clsx(styles.title, fullBleed && styles.titleFullBleed)}>
				{small || fullBleed ? (
					<Heading3 unpadded className={styles.heading}>
						{recording.title}
					</Heading3>
				) : (
					<Heading2>{recording.title}</Heading2>
				)}
			</div>
			{!hidePresenters && (
				<div className={styles.presenters}>
					{recording.persons.map((p) => (
						<PersonLockup
							key={p.name}
							person={p}
							textColor={personTextColor}
							isLinked
							isOptionalLink
							hoverColor={isDarkTheme ? BaseColors.SALMON : BaseColors.RED}
							small={small}
							altPath={altPath}
						/>
					))}
				</div>
			)}
			<div className={styles.flexGrow}>
				<div className={clsx(styles.details, styles.detailsWithLike)}>
					{!disablePlayback && (
						<PlayButton
							recording={recording}
							playlistRecordings={playlistRecordings}
							isDarkTheme={isDarkTheme}
						/>
					)}
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
					onClick={() => {
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
						className={clsx(
							styles.content,
							unpadded && styles.unpadded,
							fullBleed && styles.fullBleed
						)}
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
			<div
				className={clsx(
					styles.playlist,
					unpadded && styles.playlistUnpadded,
					fullBleed && styles.playlistFullBleed
				)}
			>
				{!disableUserFeatures && (
					<ButtonAddToPlaylist
						recordingId={recording.id}
						backgroundColor={backgroundColor}
						iconColor={iconColor}
						iconLight
					/>
				)}
			</div>
		</div>
	);
}
