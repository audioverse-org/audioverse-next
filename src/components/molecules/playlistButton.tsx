import React from 'react';
import ReactTooltip from 'react-tooltip';

export default function PlaylistButton(): JSX.Element {
	return (
		<>
			<button data-tip={'You must be logged in to perform this action'}>
				Add to Playlist
			</button>
			<ReactTooltip event={'click'} />
		</>
	);
}

// TODO: Consider moving ReactTooltip to top-level component + custom test
//   renderer
