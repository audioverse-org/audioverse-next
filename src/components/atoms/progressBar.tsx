import styles from './progressBar.module.scss';
import React, { CSSProperties } from 'react';

interface ProgressBarProps {
	progress: number;
}

export default function ProgressBar({
	progress,
}: ProgressBarProps): JSX.Element {
	const cssProps = { '--progress': `${progress * 100}%` } as CSSProperties;
	return (
		<span className={styles.progress} style={cssProps}>
			<span />
		</span>
	);
}
