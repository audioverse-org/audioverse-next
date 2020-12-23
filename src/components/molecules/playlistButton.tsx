import React from 'react';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';

import { useMe } from '@lib/api/useMe';

export default function PlaylistButton(): JSX.Element {
	const me = useMe();
	const playlists = me?.playlists?.nodes;
	const tip = !me && 'You must be logged in to perform this action';

	return (
		<>
			<button data-tip={tip}>Add to Playlist</button>
			<ReactTooltip event={'click'} />
			<Modal isOpen={true}>
				<ul>
					{playlists && playlists.map((p, i) => <li key={i}>{p.title}</li>)}
				</ul>
			</Modal>
		</>
	);
}

// TODO: Consider moving ReactTooltip to top-level component + custom test
//   renderer
