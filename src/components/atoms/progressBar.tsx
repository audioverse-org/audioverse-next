import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { useIntl } from 'react-intl';

import styles from './progressBar.module.scss';

interface ProgressBarProps {
	progress: number;
	setProgress?: (newProgress: number) => void;
	className?: string;
}

export default function ProgressBar({
	progress,
	setProgress,
	className,
}: ProgressBarProps): JSX.Element {
	const intl = useIntl();
	const cssProps = { '--progress': `${progress * 100}%` } as CSSProperties;
	return (
		<span
			className={clsx(
				styles.progress,
				className,
				!setProgress && styles.pointerDisabled
			)}
			style={cssProps}
		>
			<input
				type="range"
				value={progress * 100}
				aria-label={intl.formatMessage({
					id: 'atom-progressBar__label',
					defaultMessage: 'progress',
					description: 'progress bar label',
				})}
				readOnly={true}
				onChange={(e) =>
					setProgress && setProgress(parseInt(e.target.value) / 100)
				}
				disabled={!setProgress}
			/>
		</span>
	);
}
