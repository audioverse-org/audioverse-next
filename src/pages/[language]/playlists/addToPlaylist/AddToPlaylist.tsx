import React from 'react';

import HorizontalRule from '~src/components/atoms/horizontalRule';
import { BaseColors } from '~src/lib/constants';
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
			<HorizontalRule color={BaseColors.CREAM} />
			<ListenLaterItem id={recId} />
			<PlaylistList language={languageFullForm} recordingId={recId} />
		</div>
	);
};

export default PlaylistsPage;
