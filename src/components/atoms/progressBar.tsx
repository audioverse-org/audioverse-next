import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { useIntl } from 'react-intl';

import styles from './progressBar.module.scss';

interface ProgressBarProps {
	progress: number;
	bufferedProgress?: number;
	setProgress?: (newProgress: number) => void;
	className?: string;
}

export default function ProgressBar({
	progress,
	bufferedProgress,
	setProgress,
	className,
}: ProgressBarProps): JSX.Element {
	const intl = useIntl();
	return (
		<span
			className={clsx(
				styles.progress,
				className,
				!setProgress && styles.pointerDisabled
			)}
			style={{
				'--progress': `${progress * 100}%`,
				'--buffered': `${(bufferedProgress || 0) * 100}%`,
			}}
		>
			<input
				type="range"
				value={progress * 100}
				step={0.0001}
				aria-label={intl.formatMessage({
					id: 'atom-progressBar__label',
					defaultMessage: 'progress',
					description: 'progress bar label',
				})}
				readOnly={!setProgress}
				onInput={(e) =>
					setProgress &&
					setProgress(parseFloat((e.target as HTMLInputElement).value) / 100)
				}
				disabled={!setProgress}
			/>
		</span>
	);
}
