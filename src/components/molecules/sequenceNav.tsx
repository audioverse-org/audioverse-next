import React from 'react';
import { useIntl } from 'react-intl';

import { SequenceNavFragment } from '@lib/generated/graphql';
import { makeSermonRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ArrowLeft from '../../../public/img/icon-arrow-left.svg';
import ArrowRight from '../../../public/img/icon-arrow-right.svg';

import Button from './button';
import styles from './sequenceNav.module.scss';

function getSiblingByIndexOffset(
	recording: SequenceNavFragment,
	offset: number
) {
	const nodes = recording.sequence?.recordings?.nodes;

	if (!nodes || recording.sequenceIndex === null) return;

	const zeroBasedIndex = recording.sequenceIndex - 1;
	const targetIndex = zeroBasedIndex + offset;

	return nodes[targetIndex];
}

export default function SequenceNav({
	recording,
}: {
	recording: SequenceNavFragment;
}): JSX.Element {
	const langRoute = useLanguageRoute();
	const intl = useIntl();
	const previousRecording = getSiblingByIndexOffset(recording, -1);
	const nextRecording = getSiblingByIndexOffset(recording, 1);

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

	return (
		<div className={styles.sequenceNav}>
			{previousRecording && (
				<Button
					type="secondary"
					href={makeSermonRoute(langRoute, previousRecording.id)}
					text={labelPrevious}
					Icon={ArrowLeft}
					iconPosition="left"
				/>
			)}
			{nextRecording && (
				<Button
					type="secondary"
					href={makeSermonRoute(langRoute, nextRecording.id)}
					text={labelNext}
					Icon={ArrowRight}
					iconPosition="right"
				/>
			)}
		</div>
	);
}
