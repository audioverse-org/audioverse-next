import React from 'react';
import { useIntl } from 'react-intl';

import IconBack from '../../../public/img/icons/icon-back-light.svg';
import IconForward from '../../../public/img/icons/icon-forward-light.svg';

import Button from './button';
import styles from './sequenceNav.module.scss';
import { SequenceNavFragment } from './__generated__/sequenceNav';

export default function SequenceNav({
	recording: { sequencePreviousRecording, sequenceNextRecording },
	useInverse,
}: {
	recording: SequenceNavFragment;
	useInverse: boolean;
}): JSX.Element {
	const intl = useIntl();

	const labelPrevious = intl.formatMessage({
		id: 'organism-recording__buttonLabelPrevious',
		defaultMessage: 'Previous',
		description: 'recording previous button label',
	});

	const labelNext = intl.formatMessage({
		id: 'organism-recording__buttonLabelNext',
		defaultMessage: 'Next',
		description: 'recording next button label',
	});

	const buttonType = useInverse ? 'secondaryInverse' : 'secondary';

	return (
		<div className={styles.sequenceNav}>
			{sequencePreviousRecording ? (
				<Button
					type={buttonType}
					href={sequencePreviousRecording.canonicalPath}
					text={labelPrevious}
					IconLeft={IconBack}
				/>
			) : (
				<div />
			)}
			{sequenceNextRecording && (
				<Button
					type={buttonType}
					href={sequenceNextRecording.canonicalPath}
					text={labelNext}
					IconRight={IconForward}
				/>
			)}
		</div>
	);
}
