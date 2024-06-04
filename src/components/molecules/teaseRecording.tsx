import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading3 from '~components/atoms/heading3';
import Heading6 from '~components/atoms/heading6';
import ProgressBar from '~components/atoms/progressBar';
import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { BaseColors } from '~lib/constants';
import { useFormattedDuration } from '~lib/time';
import usePlaybackSession, { PlaySource } from '~lib/usePlaybackSession';
import IconClosure from '~public/img/icons/icon-closure.svg';
import IconDisclosure from '~public/img/icons/icon-disclosure.svg';
import IconListeningAnimated from '~public/img/icons/icon-listening-animated.svg';
import IconPlay from '~public/img/icons/icon-play.svg';
import SuccessIcon from '~public/img/icons/icon-success-light.svg';
import { RecordingContentType } from '~src/__generated__/graphql';
import { getSessionToken } from '~src/lib/cookies';
import useLanguageRoute from '~src/lib/useLanguageRoute';
import NewPlaylist from '~src/pages/[language]/library/playlists/new';

import AddToPlaylistIcon from '../../../public/img/icons/in-queue-light.svg';
import { analytics } from '../../lib/analytics';
import PlaylistsPage from '../../pages/[language]/library/playlists/addToPlaylist/AddToPlaylist';
import Modal from '../organisms/modal';
import { GlobalModalsContext } from '../templates/andGlobalModals';
import { TeaseRecordingFragment } from './__generated__/teaseRecording';
import Button from './button';
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
	hideSinglePart?: boolean;
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
	hideSinglePart,
	isOptionalLink,
	disableUserFeatures,
	disablePlayback = false,
}: Props): JSX.Element {
	const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
	const [isPlaylistModalNewOpen, setIsPlaylistModalNewOpen] = useState(false);
	const intl = useIntl();
	const router = useRouter();
	const session = usePlaybackSession(recording, { playlistRecordings });
	const progress = session.progress;
	const [personsExpanded, setPersonsExpanded] = useState(false);
	const language = useLanguageRoute();
	const index = recording.sequenceIndex;
	const count = recording.sequence?.recordings.aggregate?.count;
	const context = useContext(GlobalModalsContext);

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

	const iconColor = BaseColors.MID_TONE;

	const label = intl.formatMessage({
		id: 'add_to_playlist_btn',
		defaultMessage: 'Playlist',
		description: 'Add to Playlist button label',
	});

	const handleCloseNewModal = () => {
		setIsPlaylistModalNewOpen(false);
		setIsPlaylistModalOpen(true);
	};

	const inner = (
		<>
			{!playlistRecordings && (
				<div className={styles.part}>
					{index && count ? (
						<FormattedMessage
							id="molecule-teaseRecording__partInfo"
							defaultMessage="Part {index} of {count}"
							description="recording tease part info"
							values={{ index, count }}
						/>
					) : (
						!hideSinglePart &&
						(recording.recordingContentType ===
						RecordingContentType.AudiobookTrack ? (
							<FormattedMessage
								id="molecule-teaseRecording__individualChapter"
								defaultMessage="Individual Chapter"
							/>
						) : recording.recordingContentType ===
						  RecordingContentType.MusicTrack ? (
							<FormattedMessage
								id="molecule-teaseRecording__individualTrack"
								defaultMessage="Individual Track"
							/>
						) : recording.recordingContentType ===
						  RecordingContentType.Sermon ? (
							<FormattedMessage
								id="molecule-teaseRecording__individualTeaching"
								defaultMessage="Individual Teaching"
							/>
						) : (
							<FormattedMessage
								id="molecule-teaseRecording__individualStory"
								defaultMessage="Individual Story"
							/>
						))
					)}
				</div>
			)}
			<div className={styles.title}>
				{small ? (
					<Heading3 unpadded className={styles.heading}>
						{recording.title}
					</Heading3>
				) : (
					<Heading2>{recording.title}</Heading2>
				)}
				{!disablePlayback && (
					<div className={styles.play}>
						{session.isPlaying ? (
							<IconButton
								Icon={IconListeningAnimated}
								onClick={() => {
									// let propagate to recording push
								}}
								color={isDarkTheme ? BaseColors.WHITE : BaseColors.DARK}
								backgroundColor={backgroundColor}
							/>
						) : (
							<IconButton
								Icon={IconPlay}
								onClick={(e) => {
									e.preventDefault();
									session.play(PlaySource.Tease);
								}}
								color={isDarkTheme ? BaseColors.WHITE : BaseColors.DARK}
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
				<div className={clsx(styles.details, styles.detailsWithLike)}>
					<span className={styles.duration}>
						{useFormattedDuration(recording.duration)}
					</span>
					{progress >= 1 && <SuccessIcon />}
					{progress > 0 && (progress < 1 || session.isLoaded) && (
						<span className={styles.progress}>
							<ProgressBar progress={progress} />
						</span>
					)}
				</div>
			</div>
		</>
	);

	return (
		<>
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
					<IconButton
						Icon={AddToPlaylistIcon}
						onClick={(e) => {
							e.preventDefault();
							const isLoggedOut = !getSessionToken();
							if (isLoggedOut) {
								return context.challengeAuth(() =>
									setIsPlaylistModalOpen(true)
								);
							}
							setIsPlaylistModalOpen(true);
						}}
						backgroundColor={backgroundColor}
						className={clsx(
							styles.like,
							unpadded && styles.likeUnpadded,
							styles.likeActive
						)}
						color={iconColor}
						{...{
							'aria-label': label,
						}}
					/>
				)}
			</div>
			<Modal
				open={isPlaylistModalOpen}
				onClose={() => setIsPlaylistModalOpen(false)}
				title={
					<FormattedMessage
						id="add_to_playlist"
						defaultMessage="Add To Playlist"
					/>
				}
				rightElmt={
					<Button
						onClick={() => {
							setIsPlaylistModalOpen(false);
							setIsPlaylistModalNewOpen(true);
						}}
						className={styles.modalLink}
						text={
							<FormattedMessage id="create_new" defaultMessage="Create New" />
						}
						type="none"
					/>
				}
				hideClose
			>
				<PlaylistsPage language={language} recId={recording.id} />
			</Modal>
			<Modal
				open={isPlaylistModalNewOpen}
				onClose={handleCloseNewModal}
				title={
					<FormattedMessage id="new_playlist" defaultMessage="New playlist" />
				}
				rightElmt={<></>}
				hideClose
			>
				<NewPlaylist id={recording.id} onClose={handleCloseNewModal} />
			</Modal>
		</>
	);
}
