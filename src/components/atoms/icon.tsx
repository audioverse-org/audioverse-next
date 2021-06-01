import React from 'react';

type IconProps = {
	icon: string;
	size?: number;
};

export default function Icon({ icon, size = 16 }: IconProps): JSX.Element {
	return <img src={`/img/icon-${icon}.svg`} height={size} width={size} />;
}
