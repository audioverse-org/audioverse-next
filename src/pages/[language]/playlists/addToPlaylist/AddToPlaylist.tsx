import React from 'react';

import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';

import ListenLaterItem from './ListenLaterItem';
import PlaylistList from './PlaylistList';

interface PlaylistsPageProps {
	language: string;
	recId: string | number;
}

const PlaylistsPage: React.FC<PlaylistsPageProps> = ({ language, recId }) => {
	const languageFullForm = getLanguageIdByRoute(language);

	return (
		<div>
			<ListenLaterItem id={recId} />
			<PlaylistList language={languageFullForm} recordingId={recId} />
		</div>
	);
};

export default PlaylistsPage;
