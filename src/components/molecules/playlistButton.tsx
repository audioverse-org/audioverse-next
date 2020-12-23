import _ from 'lodash';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import { useMe } from '@lib/api/useMe';

export default function PlaylistButton(): JSX.Element {
	const me = useMe();
	const lists = _.get(me, 'playlists.nodes', []);

	return (
		<>
			<button data-tip data-for={'playlistButton'}>
				Add to Playlist
			</button>
			<ReactTooltip id={'playlistButton'} event={'click'}>
				{me ? (
					<ul>{lists && lists.map((l, i) => <li key={i}>{l.title}</li>)}</ul>
				) : (
					'You must be logged in to perform this action'
				)}
			</ReactTooltip>
		</>
	);
}
