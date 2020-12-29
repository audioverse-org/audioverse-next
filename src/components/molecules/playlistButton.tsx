import React, { useEffect, useState } from 'react';
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
				Add to Playlist
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
						<button
							onClick={() => {
								setNewPlaylistTitle('');
								addPlaylist(newPlaylistTitle, { recordingIds: [recordingId] });

								// TODO: use graphql add query to include recording id

								// if (!playlistId) {
								// 	throw new Error('Failed to create new playlist');
								// }
								//
								// await setPlaylistMembership(recordingId, playlistId, true);
							}}
						>
							Create
						</button>
					</>
				) : (
					'You must be logged in to perform this action'
				)}
			</ReactTooltip>
		</>
	);
}
