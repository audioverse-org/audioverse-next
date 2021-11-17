import clsx from 'clsx';
import React from 'react';

import { BaseColors } from '@lib/constants';

import styles from './section.module.scss';

interface SectionProps {
	text: React.ReactNode;
	media?: React.ReactNode;
	bleed?: boolean;
	theme?: BaseColors.DARK | BaseColors.LIGHT_TONE | BaseColors.CREAM;
	center?: boolean;
	reverse?: boolean;
	className?: string;
}

export default function Section({
	text,
	media,
	theme,
	center,
	reverse,
	bleed,
	className,
}: SectionProps): JSX.Element {
	return (
		<div
			className={clsx(
				styles.base,
				theme && styles[theme],
				center && styles.center,
				reverse && styles.reverse,
				bleed && styles.bleed,
				className
			)}
		>
			{media && <div className={styles.media}>{media}</div>}
			<div className={styles.content}>{text}</div>
		</div>
	);
}
