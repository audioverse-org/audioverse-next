import clsx from 'clsx';
import React from 'react';

import baseColors from './baseColors.module.scss';
import styles from './horizontalRule.module.scss';

type Props = {
	color: 'dark' | 'lightTone' | 'midTone';
	className?: string;
};

export default function HorizontalRule({
	color,
	className,
}: Props): JSX.Element {
	return (
		<div
			className={clsx(
				styles.base,
				baseColors[`borderColor-${color}`],
				className
			)}
		/>
	);
}
