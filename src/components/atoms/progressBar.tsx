import React, { ChangeEvent, CSSProperties } from 'react';

import styles from './progressBar.module.scss';

interface ProgressBarProps {
	progress: number;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ProgressBar({
	progress,
	onChange,
}: ProgressBarProps): JSX.Element {
	const cssProps = { '--progress': `${progress * 100}%` } as CSSProperties;
	return (
		<span className={styles.progress} style={cssProps}>
			<input
				type="range"
				value={progress * 100}
				aria-label={'progress'}
				readOnly={true}
				onChange={onChange}
			/>
		</span>
	);
}
