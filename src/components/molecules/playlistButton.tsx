import React from 'react';
import ReactTooltip from 'react-tooltip';

import { useMe } from '@lib/api/useMe';

export default function PlaylistButton(): JSX.Element {
	const me = useMe();
	const tip = !me && 'You must be logged in to perform this action';

	return (
		<>
			<button data-tip={tip}>Add to Playlist</button>
			<ReactTooltip event={'click'} />
		</>
	);
}

// TODO: Consider moving ReactTooltip to top-level component + custom test
//   renderer
