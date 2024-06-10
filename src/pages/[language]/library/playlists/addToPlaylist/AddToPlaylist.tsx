import React from 'react';

import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';

import ListenLaterItem from './ListenLaterItem';
import PlaylistList from './PlaylistList';

interface AddToPlaylistProps {
	language: string;
	recId: string | number;
	refreshKey: number;
}

const AddToPlaylist: React.FC<AddToPlaylistProps> = ({
	language,
	recId,
	refreshKey,
}) => {
	const languageFullForm = getLanguageIdByRoute(language);

	return (
		<div>
			<ListenLaterItem id={recId} />
			<PlaylistList
				language={languageFullForm}
				recordingId={recId}
				refreshKey={refreshKey}
			/>
		</div>
	);
};

export default AddToPlaylist;
