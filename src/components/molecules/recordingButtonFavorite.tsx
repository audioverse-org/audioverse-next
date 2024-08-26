import React from 'react';

import { useIsRecordingFavorited } from '~lib/api/useIsRecordingFavorited';
import { BaseColors } from '~lib/constants';
import { Scalars } from '~src/__generated__/graphql';

import ButtonFavorite from './buttonFavorite';

export default function RecordingButtonFavorite({
	id,
	title,
	sequenceId,
	...props
}: {
	id: Scalars['ID']['output'];
	title?: string;
	sequenceId?: Scalars['ID']['output'];
	backgroundColor: BaseColors;
	light?: boolean;
	className?: string;
}): JSX.Element {
	const { isFavorited, toggleFavorited } = useIsRecordingFavorited(
		id,
		sequenceId,
	);

	return (
		<ButtonFavorite
			favoritedType="Recording"
			favoritedId={id}
			favoritedTitle={title}
			isFavorited={!!isFavorited}
			toggleFavorited={toggleFavorited}
			{...props}
		/>
	);
}
