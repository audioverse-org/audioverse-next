import clsx from 'clsx';
import { Fragment } from 'react';

import TeaseRecording from '~components/molecules/teaseRecording';

import { TeaseRecordingFragment } from './__generated__/teaseRecording';
import WithCardTheme, { CardTheme } from './card/base/withCardTheme';
import styles from './teaseRecordingStack.module.scss';

interface Props {
	recordings: TeaseRecordingFragment[];
	theme: CardTheme;
	paddedSeparator?: boolean;
	isOptionalLink?: boolean;
	allSmall?: boolean;
}

export default function TeaseRecordingStack({
	recordings,
	theme,
	allSmall,
	...props
}: Props): JSX.Element | null {
	// TODO: add expand/contract?
	return (
        <WithCardTheme theme={theme} className={styles.base}>
			{recordings.map((recording, index) => (
				<Fragment key={recording.canonicalPath}>
					<TeaseRecording
						{...{ recording, theme, ...props }}
						small={recordings.length > 1 || allSmall}
					/>
					{index + 1 < recordings.length && (
						<div className={clsx(styles.separator, styles.paddedSeparator)} />
					)}
				</Fragment>
			))}
		</WithCardTheme>
    );
}
