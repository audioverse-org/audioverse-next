import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { QueryKey } from 'react-query';
import ReactTooltip from 'react-tooltip';

import { useAddPlaylist } from '@lib/api/useAddPlaylist';
import { useSetPlaylistMembership } from '@lib/api/useSetPlaylistMembership';
import {
	useGetPlaylistButtonDataQuery,
	UserPlaylist,
} from '@lib/generated/graphql';
import { useLanguageId } from '@lib/useLanguageId';

import styles from './playlistButton.module.scss';

type Playlist = Pick<UserPlaylist, 'id' | 'title' | 'hasRecording'>;

interface PlaylistButtonProps {
	recordingId: string;
}

// TODO: Move this component to its own file
const Entry = ({
	playlist,
	recordingId,
	cacheKey,
}: {
	playlist: Playlist;
	recordingId: string;
	cacheKey: QueryKey;
}) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const setPlaylistMembership = useSetPlaylistMembership(cacheKey);

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
	const language = useLanguageId();
	const queryVariables = {
		language,
		recordingId,
	};
	const { data = {} } = useGetPlaylistButtonDataQuery(queryVariables) || {};
	const lists = data?.me?.user?.playlists?.nodes;
	const cacheKey = ['getPlaylistButtonData', queryVariables];
	const addPlaylist = useAddPlaylist(cacheKey, 'me.user.playlists.nodes');
	const [newPlaylistTitle, setNewPlaylistTitle] = useState<string>('');
	const [isPublic, setIsPublic] = useState<boolean>(false);

	const getEntries = () => {
		return (
			lists &&
			lists.map((l: Playlist, i: number) => (
				<Entry
					recordingId={recordingId}
					playlist={l}
					key={i}
					cacheKey={cacheKey}
				/>
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
							onClick={async () => {
								setNewPlaylistTitle('');
								setIsPublic(false);
								await addPlaylist(newPlaylistTitle, {
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
