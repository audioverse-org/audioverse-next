import _ from 'lodash';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import { setPlaylistMembership } from '@lib/api/setPlaylistMembership';
import { useMe } from '@lib/api/useMe';
import { Playlist } from 'types';

interface PlaylistButtonProps {
	recordingId: string;
}

export default function PlaylistButton({
	recordingId,
}: PlaylistButtonProps): JSX.Element {
	const me = useMe();
	const lists = _.get(me, 'playlists.nodes', []);

	const getEntries = () => {
		return (
			lists &&
			lists.map((l: Playlist, i: number) => (
				<li key={i}>
					<label>
						<input
							type={'checkbox'}
							onChange={() => {
								// TODO: toggle bool
								setPlaylistMembership(recordingId, l.id, true);
							}}
						/>
						{l.title}
					</label>
				</li>
			))
		);
	};

	return (
		<>
			<button data-tip data-for={'playlistButton'}>
				Add to Playlist
			</button>
			<ReactTooltip id={'playlistButton'} event={'click'}>
				{me ? (
					<ul>{getEntries()}</ul>
				) : (
					'You must be logged in to perform this action'
				)}
			</ReactTooltip>
		</>
	);
}
