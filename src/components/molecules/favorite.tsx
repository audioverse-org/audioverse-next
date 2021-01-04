import React from 'react';

import { useIsRecordingFavorited } from '@lib/api';

export default function Favorite({ id }: { id: string }): JSX.Element {
	const { isRecordingFavorited, toggleFavorited } = useIsRecordingFavorited(id);

	return (
		<button onClick={() => toggleFavorited()}>
			{isRecordingFavorited ? 'Unfavorite' : 'Favorite'}
		</button>
	);
}
