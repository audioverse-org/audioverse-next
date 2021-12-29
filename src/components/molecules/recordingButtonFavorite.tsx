import React from 'react';

import { useIsRecordingFavorited } from '@lib/api/useIsRecordingFavorited';
import { BaseColors } from '@lib/constants';
import { Scalars } from '@lib/generated/graphql';

import ButtonFavorite from './buttonFavorite';

export default function RecordingButtonFavorite({
	id,
	sequenceId,
	...props
}: {
	id: Scalars['ID'];
	sequenceId?: Scalars['ID'];
	backgroundColor: BaseColors;
	light?: boolean;
	className?: string;
}): JSX.Element {
	const { isFavorited, toggleFavorited } = useIsRecordingFavorited(
		id,
		sequenceId
	);

	return (
		<ButtonFavorite
			isFavorited={!!isFavorited}
			toggleFavorited={toggleFavorited}
			{...props}
		/>
	);
}
