import React from 'react';

export default function Icon({
	icon,
	color,
	size = 16,
}: {
	icon: string;
	color?: string;
	size?: number;
}): JSX.Element {
	return (
		<img
			src={`/img/icon-${icon}.svg`}
			height={size}
			width={size}
			style={{ fill: color }}
		/>
	);
}
