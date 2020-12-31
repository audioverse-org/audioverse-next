import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';

import { useAddPlaylist } from '@lib/api/useAddPlaylist';
import { usePlaylists } from '@lib/api/usePlaylists';
import { useSetPlaylistMembership } from '@lib/api/useSetPlaylistMembership';
import { Playlist } from 'types';

import styles from './playlistButton.module.scss';

interface PlaylistButtonProps {
	recordingId: string;
}

const Entry = ({
	playlist,
	recordingId,
}: {
	playlist: Playlist;
	recordingId: string;
}) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const setPlaylistMembership = useSetPlaylistMembership();

	useEffect(() => {
		setIsChecked(!!playlist?.hasRecording);
	}, [playlist]);

	return (
		<li>
			<label>
				<input
					type={'checkbox'}
					checked={isChecked}
					onChange={() => {
						setPlaylistMembership(recordingId, playlist.id, !isChecked);
						setIsChecked(!isChecked);
					}}
				/>
				{playlist.title}
			</label>
		</li>
	);
};

export default function PlaylistButton({
	recordingId,
}: PlaylistButtonProps): JSX.Element {
	const lists = usePlaylists({ recordingId });
	const addPlaylist = useAddPlaylist();
	const [newPlaylistTitle, setNewPlaylistTitle] = useState<string>('');
	const [isPublic, setIsPublic] = useState<boolean>(false);

	const getEntries = () => {
		return (
			lists &&
			lists.map((l: Playlist, i: number) => (
				<Entry recordingId={recordingId} playlist={l} key={i} />
			))
		);
	};

	return (
		<>
			<button data-tip data-for={'playlistButton'}>
				<FormattedMessage
					id="playlistButton__trigger"
					defaultMessage="Add to Playlist"
					description="PlaylistButton button text"
				/>
			</button>
			<ReactTooltip
				id={'playlistButton'}
				uuid={'tooltipUuid'}
				event={'click'}
				effect={'solid'}
				clickable={true}
			>
				{lists ? (
					<>
						<ul className={styles.list}>{getEntries()}</ul>
						<input
							placeholder={'New Playlist'}
							value={newPlaylistTitle}
							onChange={(e) => setNewPlaylistTitle(e.target.value)}
						/>
						<label>
							<input
								type={'checkbox'}
								checked={isPublic}
								onChange={() => setIsPublic(!isPublic)}
							/>{' '}
							<FormattedMessage
								id="playlistButton__publicToggle"
								defaultMessage="Public"
								description="PlaylistButton public toggle label"
							/>
						</label>
						<button
							onClick={() => {
								setNewPlaylistTitle('');
								setIsPublic(false);
								addPlaylist(newPlaylistTitle, {
									recordingIds: [recordingId],
									isPublic,
								});
							}}
						>
							<FormattedMessage
								id="playlistButton__createButton"
								defaultMessage="Create"
								description="PlaylistButton create button label"
							/>
						</button>
					</>
				) : (
					<FormattedMessage
						id="playlistButton__unauthenticated"
						defaultMessage="You must be logged in to perform this action"
						description="PlaylistButton not authenticated error"
					/>
				)}
			</ReactTooltip>
		</>
	);
}
