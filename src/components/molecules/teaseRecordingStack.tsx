import clsx from 'clsx';
import React from 'react';

import TeaseRecording from '@components/molecules/teaseRecording';
import { TeaseRecordingFragment } from '@lib/generated/graphql';

import WithCardTheme, { CardTheme } from './card/base/withCardTheme';
import styles from './teaseRecordingStack.module.scss';

interface Props {
	recordings: TeaseRecordingFragment[];
	theme: CardTheme;
	paddedSeparator?: boolean;
	isOptionalLink?: boolean;
}

export default function TeaseRecordingStack({
	recordings,
	theme,
	...props
}: Props): JSX.Element | null {
	// TODO: add expand/contract?
	return (
		<WithCardTheme theme={theme} className={styles.base}>
			{recordings.map((recording, index) => (
				<React.Fragment key={recording.canonicalPath}>
					<TeaseRecording
						{...{ recording, theme, ...props }}
						small={recordings.length > 1}
					/>
					{index + 1 < recordings.length && (
						<div className={clsx(styles.separator, styles.paddedSeparator)} />
					)}
				</React.Fragment>
			))}
		</WithCardTheme>
	);
}
