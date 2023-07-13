import clsx from 'clsx';
import React from 'react';

import { BaseColors } from '~lib/constants';

import styles from './home.section.module.scss';

interface SectionProps {
	text: React.ReactNode;
	media?: React.ReactNode;
	bleed?: boolean;
	theme?: BaseColors.DARK | BaseColors.LIGHT_TONE | BaseColors.CREAM;
	center?: boolean;
	reverse?: boolean;
	short?: boolean;
	tall?: boolean;
	className?: string;
}

export default function Section({
	text,
	media,
	theme,
	center,
	reverse,
	bleed,
	short,
	tall,
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
				short && styles.short,
				tall && styles.tall,
				className
			)}
		>
			{media && <div className={styles.media}>{media}</div>}
			<div className={styles.content}>{text}</div>
		</div>
	);
}
