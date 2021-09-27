import clsx from 'clsx';
import React from 'react';

import TeaseRecording from '@components/molecules/teaseRecording';
import { TeaseRecordingFragment } from '@lib/generated/graphql';

import { CardTheme } from './card/base/withTheme';
import styles from './teaseRecordingStack.module.scss';

interface Props {
	recordings: TeaseRecordingFragment[];
	theme: CardTheme;
	paddedSeparator?: boolean;
}

export default function TeaseRecordingStack({
	recordings,
	...props
}: Props): JSX.Element | null {
	// TODO: add expand/contract?
	return (
		<div className={styles.base}>
			{recordings.map((recording, index) => (
				<React.Fragment key={recording.canonicalPath}>
					<TeaseRecording
						{...{ recording, ...props }}
						small={recordings.length > 1}
					/>
					{index + 1 < recordings.length && (
						<div className={clsx(styles.separator, styles.paddedSeparator)} />
					)}
				</React.Fragment>
			))}
		</div>
	);
}
