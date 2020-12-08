import React from 'react';

import { useIsFavorited } from '@lib/api';

export default function Favorite({ id }: { id: string }): JSX.Element {
	const { isFavorited, toggle } = useIsFavorited(id);

	return (
		<button
			onClick={async () => {
				await toggle();
			}}
		>
			{isFavorited ? 'Unfavorite' : 'Favorite'}
		</button>
	);
}
