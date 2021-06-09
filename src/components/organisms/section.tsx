import React from 'react';

import styles from './section.module.scss';

interface SectionProps {
	text: any;
	media: any;
	bleed?: boolean;
	theme?: 'dark' | 'grey' | 'lightTone' | 'cream';
	center?: boolean;
	reverse?: boolean;
}

// TODO: vertical on mobile
// TODO: horizontal on desktop
// TODO: bleed mode
// TODO: style all themes
// TODO: reversed mode

export default function Section({
	text,
	media,
	theme,
	center,
	reverse,
	bleed,
}: SectionProps): JSX.Element {
	const classes = [
		styles.base,
		theme && styles[theme],
		center && styles.center,
		reverse && styles.reverse,
		bleed && styles.bleed,
	];

	return (
		<div className={classes.join(' ')}>
			<div className={styles.media}>{media}</div>
			<div className={styles.content}>{text}</div>
		</div>
	);
}
