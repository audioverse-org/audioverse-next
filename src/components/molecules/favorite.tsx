import React from 'react';

import { useIsRecordingFavorited } from '@lib/api';

export default function Favorite({ id }: { id: string }): JSX.Element {
	const { isPersonFavorited, toggleFavorited } = useIsRecordingFavorited(id);

	return (
		<button onClick={() => toggleFavorited()}>
			{isPersonFavorited ? 'Unfavorite' : 'Favorite'}
		</button>
	);
}
