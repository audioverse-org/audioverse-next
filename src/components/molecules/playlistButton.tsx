import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { setPlaylistMembership } from '@lib/api/setPlaylistMembership';
import { useMe } from '@lib/api/useMe';
import { Playlist } from 'types';

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

	useEffect(() => {
		setPlaylistMembership(recordingId, playlist.id, isChecked);
	}, [isChecked]);

	return (
		<li>
			<label>
				<input
					type={'checkbox'}
					checked={isChecked}
					onChange={() => setIsChecked(!isChecked)}
				/>
				{playlist.title}
			</label>
		</li>
	);
};

export default function PlaylistButton({
	recordingId,
}: PlaylistButtonProps): JSX.Element {
	const me = useMe();
	const lists = _.get(me, 'playlists.nodes', []);

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
			>
				{me ? (
					<ul>{getEntries()}</ul>
				) : (
					'You must be logged in to perform this action'
				)}
			</ReactTooltip>
		</>
	);
}
