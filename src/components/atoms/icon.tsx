import React from 'react';

export default function Icon({ icon }: { icon: string }): JSX.Element {
	return <img src={`/img/icon-${icon}.svg`} height={16} width={16} />;
}
