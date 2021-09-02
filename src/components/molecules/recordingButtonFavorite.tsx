import React from 'react';

import { BaseColors } from '@components/atoms/baseColors';
import { useIsRecordingFavorited } from '@lib/api';

import ButtonFavorite from './buttonFavorite';

export default function RecordingButtonFavorite({
	id,
	...props
}: {
	id: string;
	backgroundColor: BaseColors;
	light?: boolean;
	className?: string;
}): JSX.Element {
	const { isRecordingFavorited, toggleFavorited } = useIsRecordingFavorited(id);

	return (
		<ButtonFavorite
			isFavorited={!!isRecordingFavorited}
			toggleFavorited={toggleFavorited}
			{...props}
		/>
	);
}
