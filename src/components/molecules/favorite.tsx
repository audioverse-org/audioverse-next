import React from 'react';

import { useIsFavorited } from '@lib/api';

export default function Favorite({ id }: { id: string }): JSX.Element {
	const { isFavorited, toggleFavorited } = useIsFavorited(id);

	return (
		<button onClick={() => toggleFavorited()}>
			{isFavorited ? 'Unfavorite' : 'Favorite'}
		</button>
	);
}
