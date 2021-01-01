import React from 'react';

import { useIsRecordingFavorited } from '@lib/api';

export default function Favorite({ id }: { id: string }): JSX.Element {
	const { isFavorited, toggleFavorited } = useIsRecordingFavorited(id);

	return (
		<button onClick={() => toggleFavorited()}>
			{isFavorited ? 'Unfavorite' : 'Favorite'}
		</button>
	);
}
